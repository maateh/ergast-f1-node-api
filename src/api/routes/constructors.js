const express = require('express')

const router = express.Router()

// List of all constructors
router.get('/', (req, res, next) => {
  res.status(200).json({
    success: true,
    url: req.url,
    method: req.method,
    params: req.params
  })
})

// Constructor information
router.get('/:id', (req, res, next) => {
  res.status(200).json({
    success: true,
    url: req.url,
    method: req.method,
    params: req.params
  })
})

// List of all constructors within a year
router.get('/year/:year', (req, res, next) => {
  res.status(200).json({
    success: true,
    url: req.url,
    method: req.method,
    params: req.params
  })
})

// List of all constructors within a race in a year
router.get('/year/:year/round/:round', (req, res, next) => {
  res.status(200).json({
    success: true,
    url: req.url,
    method: req.method,
    params: req.params
  })
})

module.exports = router
