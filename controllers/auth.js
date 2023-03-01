const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ExpressError = require('../utils/ExpressError')

module.exports.register = async (req, res) => {
  const { username, email, password, country, city, phone } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)
  const user = new User({
    username,
    email: email,
    password: hashedPassword,
    country,
    city,
    phone
  })
  await user.save()
  res.status(201).send({ message: 'User created successfully' })
}

module.exports.login = async (req, res) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })
  if (!user) {
    throw new ExpressError('Wrong credentials', 400)
  }
  const isValidPassword = await bcrypt.compare(password, user.password)

  if (!isValidPassword) {
    throw new ExpressError('Wrong credentials', 400)
  }

  const token = jwt.sign(
    {
      userId: user._id,
      userEmail: user.email
    },
    'RANDOM-TOKEN',
    { expiresIn: '24h' }
  )

  res.status(200).send({
    message: 'Login Successful',
    user,
    token
  })
}
