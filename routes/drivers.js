const express = require('express')

const router = express.Router()

// List of all drivers
router.get('/', (req, res, next) => {
  res.status(200).json({
    success: true,
    url: req.url,
    method: req.method,
    params: req.params
  })
})

// Driver information
router.get('/:id', (req, res, next) => {
  res.status(200).json({
    success: true,
    url: req.url,
    method: req.method,
    params: req.params
  })
})

// List of all drivers within a year
router.get('/year/:year', (req, res, next) => {
  res.status(200).json({
    success: true,
    url: req.url,
    method: req.method,
    params: req.params
  })
})

// List of all drivers within a race in a year
router.get('/year/:year/round/:round', (req, res, next) => {
  res.status(200).json({
    success: true,
    url: req.url,
    method: req.method,
    params: req.params
  })
})

module.exports = router
