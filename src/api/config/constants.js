const raceRouteFilters = '(/race(/:racePosition)?(/grid/:raceGrid)?(/fastest/:raceFastest)?(/points/:racePoints)?)?'
const qualifyingRouteFilters = '(/qualifying(/:qualifyingPosition)?)?'
const sprintRouteFilters = '(/sprint(/:sprintPosition)?(/grid/:sprintGrid)?(/points/:sprintPoints)?)?'

module.exports = {
  BASE_ROUTE_FILTERS: '(/circuits/:circuitId)?(/drivers/:driverId)?(/teams/:teamId)?',
  RESULT_ROUTE_FILTERS: `${raceRouteFilters}${qualifyingRouteFilters}${sprintRouteFilters}`
}
