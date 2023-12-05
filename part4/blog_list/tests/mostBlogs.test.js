const mostBlogs = require('../utils/listHelper').mostBlogs
const blogs = require('./blogsList')

describe('most blogs', () => {

  test('find the author with the most amount of blogs', ()=> {
    const expected = {
      author: "Robert C. Martin",
      blogs: 3
    }
  
    const result = mostBlogs(blogs)
    expect(result).toEqual(expected)

  })
})