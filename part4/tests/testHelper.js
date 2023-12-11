const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
  {
    title: 'test',
    author: 'unknown',
    url: 'http://test.com',
    likes: 0,
  },
  {
    title: 'test1',
    author: 'unknown1',
    url: 'http://test1.com',
    likes: 1,
  },
];

const nonExistingId = async () => {
  const newBlog = {
    title: 'something',
  };
  const blog = new Blog(newBlog);
  await blog.save();
  await blog.deleteOne();
  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {initialBlogs, nonExistingId, blogsInDb, usersInDb }