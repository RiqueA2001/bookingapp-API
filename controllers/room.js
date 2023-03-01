const Room = require('../models/room')
const Hotel = require('../models/hotel')
const ExpressError = require('../utils/ExpressError')

module.exports.getRooms = async (req, res) => {
  const rooms = await Room.find({})
  res.status(200).send(rooms)
}

module.exports.getRoom = async (req, res) => {
  const { id } = req.params
  const room = await Room.findById(id)
  if (!room) {
    throw new ExpressError('Room not found', 404)
  }
  res.status(200).send(room)
}

module.exports.createRoom = async (req, res) => {
  const { hotelId } = req.params
  const newRoom = new Room(req.body)
  const hotel = await Hotel.findById(hotelId)
  if (!hotel) {
    throw new ExpressError('Hotel id not found', 404)
  }
  const savedRoom = await newRoom.save()
  hotel.rooms.push(savedRoom)
  const savedHotel = await hotel.save()
  res.status(201).send(savedHotel)
}

module.exports.updateRoom = async (req, res) => {
  const { id } = req.params
  const updatedRoom = await Room.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  })
  if (!updatedRoom) {
    throw new ExpressError('Room not found', 404)
  }
  res.status(200).send(updatedRoom)
}

module.exports.updateAvailability = async (req, res) => {
  await Room.updateOne(
    { 'roomNumbers._id': req.params.id },
    {
      $push: {
        'roomNumbers.$.unavailableDates': req.body.dates
      }
    }
  )
  res.status(200).send('Room status has been updated.')
}

module.exports.deleteRoom = async (req, res) => {
  const { hotelId, id } = req.params
  const room = await Room.findByIdAndDelete(id)
  if (!room) {
    throw new ExpressError('Room id not found', 404)
  }
  const hotel = await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: id } })
  if (!hotel) {
    throw new ExpressError('Hotel id not found', 404)
  }
  res.status(200).send('Room has been deleted')
}
