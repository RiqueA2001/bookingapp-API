const cors = require('cors')
const mongoose = require('mongoose')
const hotelsRoute = require('./routes/hotels')
const roomsRoute = require('./routes/rooms')
const usersRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const express = require('express')
const app = express()

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

app.use(cors({ origin: true }))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

mongoose.set('strictQuery', false)

const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1/reservationsApp'

mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('DATABASE CONNECTED'))
  .catch(err => console.log(err))

app.get('/', (req, res) => {
  res.send('HOME')
})

app.use('/hotels', hotelsRoute)
app.use('/rooms', roomsRoute)
app.use('/users', usersRoute)
app.use('/auth', authRoute)

app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'Something Went Wrong!' } = err
  res.status(statusCode).send({ message })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log('LISTENING ON PORT 3001')
})
