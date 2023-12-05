const n_ = require('lodash')


// FUNCTION FOR TESTING
const dummy = (blogs) => {
  return 1
}


/* FUNCTION THAT FINDS THE TOTAL LIKE 
OF A LIST OF BLOGS*/
const totalLikes = (blogsList) => {
  const reducer = (sum, ind) => {
    return sum + ind.likes
  }

  return blogsList.length < 1
    ? 0
    : blogsList.reduce(reducer, 0)

}


// FIND MOST LIKED BLOG
const favoriteBlog = (blogList) => {

  const myObject = blogList.reduce((mostLiked, obj) => {

    if (mostLiked === undefined) return obj
    return obj.likes > mostLiked.likes ? obj : mostLiked

  }, undefined)

  return myObject
}


/*FIND THE AUTHOR WITH THE MOST AMOUNT
OF BLOGS*/
const mostBlogs = (blogList) => {

  const countBlogs = n_.countBy(blogList, 'author')
  const myKey = Object.keys(countBlogs).pop()

  return {
    author: myKey,
    blogs: countBlogs[myKey]
  }
}


const mostLikes = (blogList) => {
  
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}