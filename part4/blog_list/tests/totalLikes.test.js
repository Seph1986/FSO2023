const totalLikes = require('../utils/listHelper').totalLikes
const blogs = require('./blogsList')

describe('total likes', () => {

  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test(`if the list it's empty`, () => {
    const result = totalLikes([])
    expect(result).toBe(0)
  })


  test('when list has only one blog, equals the likes of that', () => {
    const result = totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })


  test('total likes of multiple blogs', () => {
    const result = totalLikes(blogs)
    expect(result).toBe(36)
  })
})