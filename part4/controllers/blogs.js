const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const { userExtractor } = require('../utils/middleware');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.get('/:id', async (request, response) => {
  const blogId = request.params.id;
  const blog = await Blog.findById(blogId);
  response.json(blog);
});

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body;
  const user = request.user;
  const newBlog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });
  if (!body.title || !body.url) {
    return response.status(400).json({ error: 'Title and URL are required' });
  }
  const savedBlog = await newBlog.save();
  user.blogs = [...user.blogs, savedBlog._id];
  await user.save();
  response.status(201).json(savedBlog);
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blogId = request.params.id;
  const user = request.user;
  if (user.blogs.some(blog => blog._id.toString() === blogId)) {
    await Blog.findByIdAndDelete(blogId);
    user.blogs = user.blogs.filter((blog) => blog.id !== blogId);
    await user.save();
    response.status(204).end();
  } else {
    response
      .status(403)
      .json({ error: 'You are not eligible to delete this blog' });
  }
});

blogsRouter.put('/:id', async (request, response) => {
  const blogId = request.params.id;
  const body = request.body;
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };
  const updatedBlog = await Blog.findByIdAndUpdate(blogId, blog);
  if (!updatedBlog) {
    return response.status(404).json({ error: 'Blog not found' });
  }
  response.json(updatedBlog);
});

module.exports = blogsRouter;
