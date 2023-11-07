const getRaceResults = (req, res, next) => {
  try {
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
}

const getQualifyingResults = (req, res, next) => {
  try {
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
}

const getSprintResults = (req, res, next) => {
  try {
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getRaceResults,
  getQualifyingResults,
  getSprintResults
}
