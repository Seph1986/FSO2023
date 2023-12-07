const n_ = require('lodash')


// FUNCTION FOR TESTING
const dummy = (blogs) => { //eslint-disable-line
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


/*FIND MOST LIKED BLOG*/
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


/*FIND AUTHOR WITH MOST AMOUNT OF LIKES*/
const mostLikes = (blogList) => {
  const liked = blogList.reduce((list, blog) => {
    let author = blog.author
    let likes = blog.likes

    if (list[author]) {
      list[author] += likes
    } else
      list[author] = likes

    return list
  }, {})

  let result = undefined

  for (let key in liked) {
    if (result === undefined || result.likes < liked[key]) {
      result = {
        author: key,
        likes: liked[key]
      }
    }
  }

  return result
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}