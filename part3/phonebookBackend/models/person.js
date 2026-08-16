const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log(`connecting to ${url}`)
mongoose.connect(url, { family: 4 })
  .then(() => {
    console.log('connected to mongodb')
  })
  .catch(error => {
    console.log(`error connecting to mongodb ${error.message}`)
  })


const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: [true, 'User name is required']
  },
  number: {
    type: String,
    validate: function(v) {
      return /^\d{2,3}-\d+$/.test(v)
    },
    minLength: 8,
    required: [true, 'User phone number is required']
  }
})

personSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id.toString()
    delete returnObject._id
    delete returnObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)