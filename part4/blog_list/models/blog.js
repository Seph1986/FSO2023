const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 3
    },
    author:{
      type: String,
      required: true,
      minlength: 3
    },
    url: {
      type:String,
      required: true,
      minlength: 6
    },
    likes:{
      type: Number,
      required: true
    }
  })

  
module.exports = mongoose.model('Blog', blogSchema)

  