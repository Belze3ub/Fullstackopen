const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');

const initialBlogs = [
  {
    title: 'test',
    author: 'unknown',
    url: 'http://test.com',
    likes: 0,
    userId: 111
  },
  {
    title: 'test1',
    author: 'unknown1',
    url: 'http://test1.com',
    likes: 1,
    userId: 333
  },
];

const nonExistingId = async () => {
  const newBlog = {
    title: 'something',
  };
  const blog = new Blog(newBlog);
  await blog.save();
  await blog.deleteOne();
  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const getToken = async () => {
  const user = await User.findOne();
  const userForToken = {
    username: user.username,
    id: user._id,
  };
  return jwt.sign(userForToken, SECRET);
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  getToken,
};
