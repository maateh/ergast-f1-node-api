module.exports = {
  ROUTE_FILTERS: {
    circuits: '(/circuits/:circuitId)?',
    drivers: '(/drivers/:driverId)?',
    teams: '(/teams/:teamId)?',
    results: {
      race: '(/race(/position/:racePosition)?(/grid/:raceGrid)?(/fastest/:raceFastest)?(/points/:racePoints)?)?',
      qualifying: '(/qualifying(/position/:qualifyingPosition)?)?',
      sprint: '(/sprint(/position/:sprintPosition)?(/grid/:sprintGrid)?(/points/:sprintPoints)?)?'
    },
    standings: '(/position/:standingsPosition)?(/points/:standingsPoints)?(/wins/:standingsWins)?',
    timings: '(/lap/:timingLapNumber)?(/position/:timingPosition)?(/duration/:timingDuration)?',
    pitStops: '(/stop/:pitStop)?(/lap/:pitStopLap)?(/duration/:pitStopDuration)?'
  }
}
