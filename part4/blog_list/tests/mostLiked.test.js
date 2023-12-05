const mostLikes = require('../utils/listHelper').mostLikes
const blogs = require('./blogsList')

describe('most likes test',() => {
  
  test('author with most amount of likes', () => {
    const expected = {
      author: "Edsger W. Dijkstra",
      likes: 17
    }

    const result = mostLikes(blogs)
    expect(result).toEqual(expected)
    
  })
})