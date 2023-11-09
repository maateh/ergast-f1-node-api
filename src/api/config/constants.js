const raceRouteFilters = '(/race(/position/:racePosition)?(/grid/:raceGrid)?(/fastest/:raceFastest)?(/points/:racePoints)?)?'
const qualifyingRouteFilters = '(/qualifying(/position/:qualifyingPosition)?)?'
const sprintRouteFilters = '(/sprint(/position/:sprintPosition)?(/grid/:sprintGrid)?(/points/:sprintPoints)?)?'

module.exports = {
  BASE_ROUTE_FILTERS: '(/circuits/:circuitId)?(/drivers/:driverId)?(/teams/:teamId)?',
  RESULT_ROUTE_FILTERS: `${raceRouteFilters}${qualifyingRouteFilters}${sprintRouteFilters}`
}
