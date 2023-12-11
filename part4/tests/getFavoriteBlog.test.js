const { favoriteBlog } = require('../utils/list_helper');

describe('Favorite Blog', () => {
  const blogs = [
    {
      _id: '6574d52746089fb1c9e84c66',
      title: 'test',
      author: 'unknown',
      url: 'http://test.com',
      likes: 3,
      __v: 0,
    },
    {
      _id: '6574df59c3c7de89094a6862',
      title: 'test1',
      author: 'unknown1',
      url: 'http://test1.com',
      likes: 2,
      __v: 0,
    },
  ];
  test('Favorite blog', () => {
    const result = favoriteBlog(blogs);
    expect(result).toStrictEqual({
      title: 'test',
      author: 'unknown',
      likes: 3,
    });
  });
});
