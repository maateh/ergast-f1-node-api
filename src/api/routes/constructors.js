const express = require('express')

const controller = require('../controllers/constructors')

const router = express.Router()

// List of all constructors
router.get('/', controller.getAllConstructors)

// Constructor information
router.get('/:id', controller.getConstructorInformation)

// List of all constructors within a season
router.get('/year/:year', controller.getConstructorsWithinASeason)

// List of all constructors within a weekend in a season
router.get('/year/:year/round/:round', controller.getConstructorsWithinAWeekend)

module.exports = router
