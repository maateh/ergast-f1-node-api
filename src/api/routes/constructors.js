const express = require('express')

const controller = require('../controllers/constructors')

const router = express.Router()

// List of all constructors
router.get('/', controller.getAllConstructors)

// Constructor information
router.get('/:id', controller.getConstructorInformation)

// List of all constructors within a year
router.get('/year/:year', controller.getConstructorsWithinAYear)

// List of all constructors within a race in a year
router.get('/year/:year/round/:round', controller.getConstructorsWithinARace)

module.exports = router
