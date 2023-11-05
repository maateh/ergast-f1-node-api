function convertTimeToMs(time) {
  const [minutes, _time] = time.split(':')
  const [seconds, ms] = _time.split('.')

  const minutesInMs = minutes * 60 * 1000
  const secondsInMs = seconds * 1000

  return minutesInMs + secondsInMs + parseInt(ms)
}

module.exports = convertTimeToMs
