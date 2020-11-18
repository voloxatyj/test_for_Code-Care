const express = require('express')
const router = express.Router()
const auth = require('../../middleware/auth')
// Event Model
const Event = require('../../models/Event')

// @routes

module.exports = router