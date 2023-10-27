const db = require('../database/mysql')

// models
const Team = require('../../api/models/team')
const Season = require('../../api/models/season')
const RaceResult = require('../../api/models/raceResult')

const getAllConstructors = () => {
  const query = 'SELECT * FROM constructors'

  console.info('Get constructors from the MySQL Database...')
  return db.execute(query)
    .then(([constructors]) => constructors)
    .catch(err => {
      console.error('Query error: ', err)
    })
}

const conversion = () => {
  console.info('Teams conversion started...')
  return getAllConstructors()
    .then(constructors => {
      return constructors.map(constructor => {
        return new Team({
          ergastId: constructor.constructorId,
          ref: constructor.constructorRef,
          name: constructor.name,
          nationality: constructor.nationality,
          wiki: constructor.url,
          // _circuits: ,
        })
      })
    })
    .then(convertedTeams => {
      console.info('Inserting teams...')
      return Team.insertMany(convertedTeams)
    })
    .then(() => console.info('Teams conversion done!\n'))
    .catch(err => {
      console.error('Conversion error: ', err)
    })
}

const createAssociations = () => {
  console.info('Creating associations to the Team model...')

  return Promise.all([
    Team.find(),
    Season.find().populate('_weekends'),
    RaceResult.find().populate('_weekend'),
  ])
    .then(([teams, seasons, results]) => {
      return teams.map(team => {
        // const teamSeasons = seasons.filter(s => s._teams.includes(team._id))
        const teamResults = results.filter(r => r._team.equals(team._id))

        // const parsedSeasons = teamSeasons.map(s => {
        //   const teamWeekends = s._weekends.filter(w => w._teams.includes(team._id))
        //   return {
        //     year: s.year,
        //     _season: s._id,
        //     weekends: teamWeekends.map(w => {
        //       return {
        //         round: w.round,
        //         _weekend: w._id,
        //         _drivers: teamResults
        //           .filter(r => {
        //             return r._weekend._id.equals(w._id) && r._team.equals(team._id)
        //           })
        //           .map(r => r._driver)
        //       }
        //     })
        //   }
        // })

        const circuits = new Set(teamResults.map(r => r._weekend._circuit.toString()))

        // team.seasons = parsedSeasons
        team._circuits = Array.from(circuits)
        return team
      })
    })
    .then(updatedTeams => {
      console.info('Saving teams...')
      return Team.bulkSave(updatedTeams)
    })
    .then(() => {
      console.info('Associations is created successfully for the Team model!\n')
    })
    .catch(err => {
      console.error('Association creation error: ', err)
    })
}

module.exports = conversion
module.exports.createTeamAssociations = createAssociations
