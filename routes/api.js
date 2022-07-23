const express = require('express')
const router = express.Router()
const middleware = require('../middleware')
const HomeController = require('../controllers/HomeController')

router.get('/api/users', HomeController.users)

module.exports = router