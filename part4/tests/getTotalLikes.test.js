const listHelper = require('../utils/list_helper')

describe('Total Likes', () => {
  const blogs = [
    {
      _id: '6574d52746089fb1c9e84c66',
      title: 'test',
      author: 'unknown',
      url: 'http://test.com',
      likes: 3,
      __v: 0,
    },
  ];
  test('When list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(blogs);
    expect(result).toBe(3)
  })
})