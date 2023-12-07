require('dotenv').config()

const PORT = process.env.PORT //eslint-disable-line
let MONGODB_URI = process.env.MONGODB_URI //eslint-disable-line
if(process.env.NODE_ENV === 'test'){ //eslint-disable-line
  MONGODB_URI = process.env.TEST_MONGODB_URI //eslint-disable-line
}

module.exports = {
  MONGODB_URI,
  PORT
}