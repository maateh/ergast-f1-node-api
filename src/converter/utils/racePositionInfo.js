function getPositionInfo(positionText) {
  switch (positionText) {
    case 'R':
      return 'Retired'
    case 'D':
      return 'Disqualified'
    case 'E':
      return 'Excluded'
    case 'W':
      return 'Withdrawn'
    case 'F':
      return 'Failed to qualify'
    case 'N':
      return 'Not classified'
    default:
      return positionText
  }
}

module.exports = getPositionInfo
