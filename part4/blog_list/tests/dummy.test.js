const listHelper = require('../utils/listHelper').dummy

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper(blogs)
  expect(result).toBe(1)
})