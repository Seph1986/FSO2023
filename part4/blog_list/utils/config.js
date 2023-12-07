require('dotenv').config()

const PORT = process.env.PORT
let BLOG_URL = process.env.URL
if(process.env.NODE_ENV === 'test'){
  BLOG_URL = process.env.TEST_MONGO_URI
}

module.exports = {
  PORT,
  BLOG_URL
}