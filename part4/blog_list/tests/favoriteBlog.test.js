const favoriteBlog = require('../utils/listHelper').favoriteBlog
const blogs = require('./blogsList')

describe('favorite blog', () => {

  test('find most liked', () => {

    const mostLiked = {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    }

    const result = favoriteBlog(blogs)
    expect(result).toEqual(mostLiked)

  })
})