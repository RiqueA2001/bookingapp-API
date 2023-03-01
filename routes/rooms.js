const express = require('express')
const { catchAsync } = require('../utils/catchAsync')
const router = express.Router()
const {
  getRooms,
  getRoom,
  createRoom,
  updateRoom,
  updateAvailability,
  deleteRoom
} = require('../controllers/room')

router.get('/', catchAsync(getRooms))

router.get('/:id', catchAsync(getRoom))

router.post('/:hotelId', catchAsync(createRoom))

router.put('/', catchAsync(updateRoom))

router.put('/availability/:id', catchAsync(updateAvailability))

router.delete('/:id/:hotelId', catchAsync(deleteRoom))

module.exports = router
