const mongoose = require('mongoose')
const Hotel = require('../models/hotel')
const hotels = require('./hotels')

mongoose
  .connect('mongodb://127.0.0.1/reservationsApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DATABASE CONNECTED'))
  .catch(err => console.log(err))

const seedDatabase = async () => {
  await Hotel.deleteMany({})
  await Hotel.insertMany(hotels)
}

seedDatabase().then(() => {
  mongoose.connection.close()
})
