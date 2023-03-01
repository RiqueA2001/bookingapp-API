const Hotel = require('../models/hotel')
const ExpressError = require('../utils/ExpressError')

module.exports.getHotels = async (req, res) => {
  const { min, max, limit, ...others } = req.query
  const hotels = await Hotel.find({
    ...others,
    cheapestPrice: { $gt: min || 1, $lt: max || 9999 }
  }).limit(limit)
  res.status(200).send(hotels)
}

module.exports.getHotel = async (req, res) => {
  const { id } = req.params
  const hotel = await Hotel.findById(id).populate('rooms')
  if (!hotel) {
    throw new ExpressError('Hotel not found', 404)
  }
  res.status(200).send(hotel)
}

module.exports.createHotel = async (req, res) => {
  const images = req.files.map(file => file.path)
  const hotel = new Hotel({
    ...req.body,
    images
  })
  const createdHotel = await hotel.save()
  res.status(201).send(createdHotel)
}

module.exports.countByCity = async (req, res) => {
  const cities = req.query.cities.split(',')
  const list = await Promise.all(
    cities.map(city => {
      return Hotel.countDocuments({ city: city })
    })
  )
  res.status(200).send(list)
}

module.exports.countByType = async (req, res) => {
  const hotelCount = await Hotel.countDocuments({ type: 'hotel' })
  const apartmentCount = await Hotel.countDocuments({ type: 'apartment' })
  const resortCount = await Hotel.countDocuments({ type: 'resort' })
  const villaCount = await Hotel.countDocuments({ type: 'villa' })
  const cabinCount = await Hotel.countDocuments({ type: 'cabin' })
  const list = [
    { type: 'hotels', count: hotelCount },
    { type: 'apartments', count: apartmentCount },
    { type: 'resorts', count: resortCount },
    { type: 'villas', count: villaCount },
    { type: 'cabins', count: cabinCount }
  ]
  res.status(200).send(list)
}

module.exports.getHotelRooms = async (req, res) => {
  const { id } = req.params
  const hotel = await Hotel.findById(id).populate('rooms')
  if (!hotel) {
    throw new ExpressError('Hotel not found', 404)
  }
  res.status(200).send(hotel.rooms)
}

module.exports.updateHotel = async (req, res) => {
  const { id } = req.params
  const images = req.files.map(file => file.path)
  const updatedHotel = await Hotel.findByIdAndUpdate(
    id,
    { ...req.body, images },
    {
      new: true,
      runValidators: true
    }
  )
  if (!updatedHotel) {
    throw new ExpressError('Hotel not found', 404)
  }
  res.status(201).send(updatedHotel)
}

module.exports.deleteHotel = async (req, res) => {
  const { id } = req.params
  const hotel = await Hotel.findByIdAndDelete(id)
  if (!hotel) {
    throw new ExpressError('Hotel not found', 404)
  }
  res.status(200).send('Hotel has been deleted')
}
