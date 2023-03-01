const express = require('express')
const router = express.Router()
const { catchAsync } = require('../utils/catchAsync')
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/user')

router.get('/', catchAsync(getUsers))

router.get('/:id', catchAsync(getUser))

router.put('/:id', catchAsync(updateUser))

router.delete('/:id', catchAsync(deleteUser))

module.exports = router
