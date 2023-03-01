const mongoose = require('mongoose')

const HotelSchema = new mongoose.Schema({
  images: {
    type: [String]
  },
  type: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  distance: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  rooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room'
    }
  ],
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  cheapestPrice: {
    type: Number,
    required: true
  }
})

module.exports = mongoose.model('Hotel', HotelSchema)
