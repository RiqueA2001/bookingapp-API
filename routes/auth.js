const express = require('express')
const router = express.Router()
const { catchAsync } = require('../utils/catchAsync')
const { register, login } = require('../controllers/auth')

router.post('/register', catchAsync(register))

router.post('/login', catchAsync(login))

module.exports = router
