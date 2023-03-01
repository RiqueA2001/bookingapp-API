const express = require('express')
const router = express.Router()
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })
const { catchAsync } = require('../utils/catchAsync')
const {
  getHotels,
  getHotel,
  getHotelRooms,
  createHotel,
  countByCity,
  countByType,
  updateHotel,
  deleteHotel
} = require('../controllers/hotel')

router.get('/', catchAsync(getHotels))

router.post('/', upload.array('images'), catchAsync(createHotel))

router.get('/countByCity', catchAsync(countByCity))

router.get('/countByType', catchAsync(countByType))

router.get('/:id', catchAsync(getHotel))

router.get('/room/:id', getHotelRooms)

router.put('/:id', upload.array('images'), catchAsync(updateHotel))

router.delete('/:id', catchAsync(deleteHotel))

module.exports = router
