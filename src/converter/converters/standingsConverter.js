const db = require('../database/mysql')

// models
const Standings = require('../../api/models/mongoose/Standings')
const Weekend = require('../../api/models/mongoose/Weekend')
const Driver = require('../../api/models/mongoose/Driver')
const Team = require('../../api/models/mongoose/Team')

// utils
const { arrayToMap, arrayToPushMap } = require('../utils/arrayToMap')

const getAllDriverStandings = () => {
  const query = `
    SELECT dst.driverStandingsId, dst.raceId, dst.points, dst.position, dst.positionText, dst.wins,
      dr.driverId, co.constructorId, co.constructorRef, ra.year
    FROM races ra
    JOIN driverstandings dst ON dst.raceId = ra.raceId
    JOIN drivers dr ON dst.driverId = dr.driverId
    LEFT JOIN results re ON dst.raceId = re.raceId AND dst.driverId = re.driverId
    LEFT JOIN constructors co ON re.constructorId = co.constructorId
    ORDER BY ra.year, dst.raceId, dst.position ASC
  `

  console.info('Get driver standings data from the MySQL Database...')
  return db.execute(query)
    .then(([driverStandingsData]) => driverStandingsData)
    .catch(err => {
      console.error('Query error: ', err)
    })
}

const getAllConstructorStandings = () => {
  const query = `
    SELECT cs.constructorStandingsId, cs.raceId, cs.points, cs.position, cs.positionText, cs.wins,
      co.constructorId, ra.year, GROUP_CONCAT(dr.driverId) AS driverIds, GROUP_CONCAT(dr.driverRef) AS driverRefs
    FROM races ra
      JOIN constructorstandings cs ON cs.raceId = ra.raceId
      JOIN constructors co ON cs.constructorId = co.constructorId
      LEFT JOIN results re ON cs.raceId = re.raceId AND co.constructorId = re.constructorId
      LEFT JOIN drivers dr ON re.driverId = dr.driverId
    GROUP BY cs.constructorStandingsId, cs.raceId, cs.points, cs.position, cs.positionText, cs.wins,
      co.constructorRef, ra.year, ra.round
      ORDER BY ra.year, cs.raceId, cs.position ASC
  `

  console.info('Get constructor standings data from the MySQL Database...')
  return db.execute(query)
    .then(([constructorStandingsData]) => constructorStandingsData)
    .catch(err => {
      console.error('Query error: ', err)
    })
}

const conversion = () => {
  console.info('Standings conversion started...')
  return Promise.all([
    getAllDriverStandings(),
    getAllConstructorStandings(),
    Weekend.find().sort({
      'season.year': -1,
      round: 1
    }),
    Driver.find(),
    Team.find()
  ])
    .then(([driverStandingsData, constructorStandingsData, weekends, drivers, teams]) => {
      console.info('Converting standings data...')

      const driverStandingsMap = arrayToPushMap(driverStandingsData, 'raceId')
      const constructorStandingsMap = arrayToPushMap(constructorStandingsData, 'raceId')
      const driversMap = arrayToMap(drivers, 'ergastId')
      const teamsMap = arrayToMap(teams, 'ergastId')

      return weekends.reduce((standings, weekend) => {
        const currentDriverStandings = driverStandingsMap[weekend.ergastId]
        const currentConstructorStandings = constructorStandingsMap[weekend.ergastId]
        const prevStandings = standings[standings.length - 1] || null

        // Doesn't need to store standings on weekends
        // which haven't yet been held.
        if (!currentDriverStandings && !currentConstructorStandings) {
          return standings
        }

        const currentStandings = new Standings({
          season: {
            year: weekend.season.year,
            _season: weekend.season._season
          },
          weekend: {
            round: weekend.round,
            _weekend: weekend._id
          },
          driverStandings: parseDriverStandings(currentDriverStandings, prevStandings, driversMap, teamsMap),
          teamStandings: parseTeamStandings(currentConstructorStandings, prevStandings, teamsMap, driversMap),
        })
        standings.push(currentStandings)
        return standings
      }, [])
    })
    .then(convertedStandings => {
      console.info('Inserting standings data...')
      return Standings.insertMany(convertedStandings)
    })
    .then(() => {
      console.info('Standings conversion done!')
    })
    .catch(err => {
      console.error('Conversion error: ', err)
    })
}

function parseDriverStandings(currentDriverStandings, prevStandings, driversMap, teamsMap) {
  return currentDriverStandings.map(dst => {
    const currentDriver = driversMap[dst.driverId]
    const currentTeam = teamsMap[dst.constructorId]
    let currentDriverTeams = []

    const currentDriverPrevStanding = prevStandings?.driverStandings
      .find(prevDst => {
        return prevDst.driver.ref === currentDriver.ref &&
          prevStandings.season.year === dst.year
      })

    if (currentDriverPrevStanding) {
      const prevTeams = currentDriverPrevStanding.teams || []
      currentDriverTeams = prevTeams.find(t => t.ref === dst.constructorRef)
        ? prevTeams
        : (currentTeam ? [...prevTeams, currentTeam] : prevTeams)
    } else {
      currentDriverTeams.push({
        ref: currentTeam.ref,
        _team: currentTeam._id
      })
    }

    return {
      ergastId: dst.driverStandingsId,
      driver: {
        ref: currentDriver.ref,
        _driver: currentDriver._id
      },
      teams: currentDriverTeams,
      points: dst.points,
      position: {
        order: dst.position,
        info: dst.positionText
      },
      wins: dst.wins
    }
  })
}

function parseTeamStandings(currentConstructorStandings, prevStandings, teamsMap, driversMap) {
  return currentConstructorStandings?.map(cst => {
    const currentTeam = teamsMap[cst.constructorId]
    const currentDrivers = cst.driverIds?.split(',').map(id => driversMap[id]) || []
    let currentTeamDrivers = []

    const currentTeamPrevStanding = prevStandings?.teamStandings
      .find(prevCst => {
        return prevCst.team.ref === currentTeam.ref &&
          prevStandings.season.year === cst.year
      })

    if (currentTeamPrevStanding) {
      const prevDrivers = currentTeamPrevStanding.drivers || []
      const prevDriverIds = new Set(prevDrivers.map(pd => pd.ref))
      currentTeamDrivers = [
        ...prevDrivers,
        ...currentDrivers.filter(cd => !prevDriverIds.has(cd.ref))
      ]
    } else {
      currentDrivers.forEach(cd => {
        currentTeamDrivers.push({
          ref: cd.ref,
          _driver: cd._id
        })
      })
    }

    return {
      ergastId: cst.constructorStandingsId,
      team: {
        ref: currentTeam.ref,
        _team: currentTeam._id
      },
      drivers: currentTeamDrivers,
      points: cst.points,
      position: {
        order: cst.position,
        info: cst.positionText
      },
      wins: cst.wins
    }
  })
}

module.exports = conversion
