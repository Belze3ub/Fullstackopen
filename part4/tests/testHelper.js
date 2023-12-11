const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { SECRET } = require('../utils/config');

const initialBlogs = [
  {
    title: 'test',
    author: 'unknown',
    url: 'http://test.com',
    likes: 10,
  },
  {
    title: 'test1',
    author: 'unknown1',
    url: 'http://test1.com',
    likes: 1,
  },
  {
    title: 'test2',
    author: 'unknown',
    url: 'http://test1.com',
    likes: 6,
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

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map((blog) => blog.likes));
  const favorite = blogs.find((blog) => blog.likes === maxLikes);
  return {
    title: favorite.title,
    author: favorite.author,
    url: favorite.url,
    likes: favorite.likes,
  };
};

const mostBlogs = (blogs) => {
  const blogCounts = blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1;
    return counts;
  }, {});
  const topAuthor = Object.keys(blogCounts).reduce((a, b) =>
    blogCounts[a] > blogCounts[b] ? a : b
  );

  return {
    author: topAuthor,
    blogs: blogCounts[topAuthor],
  };
};

const mostLikes = (blogs) => {
  const likesByAuthor = blogs.reduce((likes, blog) => {
    likes[blog.author] = (likes[blog.author] || 0) + blog.likes;
    return likes;
  }, {});

  const topAuthor = Object.keys(likesByAuthor).reduce((a, b) =>
    likesByAuthor[a] > likesByAuthor[b] ? a : b
  );

  return {
    author: topAuthor,
    likes: likesByAuthor[topAuthor],
  };
}

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
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
