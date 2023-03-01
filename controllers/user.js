const User = require('../models/user')
const ExpressError = require('../utils/ExpressError')

module.exports.getUsers = async (req, res) => {
  const users = await User.find({})
  res.status(200).send(users)
}

module.exports.getUser = async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)
  if (!user) {
    throw new ExpressError('User not found')
  }
  res.status(200).send(user)
}

module.exports.updateUser = async (req, res) => {
  const { id } = req.params
  const updatedUser = await User.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  })
  if (!updatedUser) {
    throw new ExpressError('User not found')
  }
  res.status(200).send(updatedUser)
}

module.exports.deleteUser = async (req, res) => {
  const { id } = req.params
  const user = await User.findByIdAndDelete(id)
  if (!user) {
    throw new ExpressError('User not found')
  }
  res.status(200).send('User has been delete')
}
