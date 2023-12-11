const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const api = supertest(app);
const Blog = require('../models/blog');
const { initialBlogs, nonExistingId, blogsInDb } = require('./testHelper');

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of initialBlogs) {
    const blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(initialBlogs.length);
});

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs');
  const title = response.body.map((blog) => blog.title);
  expect(title).toContain('test');
});

test('unique identifier is named "id"', async () => {
  const response = await api.get('/api/blogs');
  const blog = response.body[0];
  expect(Object.keys(blog)).toContain('id');
});

test('valid blog post can be added', async () => {
  const newBlog = {
    title: 'newBlog',
    author: 'newBlog',
    url: 'http://newBlog.com',
    likes: 1,
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  const blogs = await blogsInDb();
  expect(blogs).toHaveLength(initialBlogs.length + 1);

  const titles = blogs.map((blog) => blog.title);
  expect(titles).toContain('newBlog');
});

test('if blog don\'t have "likes" property then likes equals 0', async () => {
  const newBlog = {
    title: 'newBlog',
    author: 'newBlog',
    url: 'http://newBlog.com',
  };
  const newBlogCheck = !Object.keys(newBlog).includes('likes')
    ? { ...newBlog, likes: 0 }
    : newBlog;
  await api
    .post('/api/blogs')
    .send(newBlogCheck)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  const response = await api.get('/api/blogs');
  const likes = response.body.map((blog) => blog.likes);
  expect(likes[likes.length - 1]).toBe(0);
});

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'newBlog',
    url: 'http://newBlog.com',
    likes: 1,
  };
  await api.post('/api/blogs').send(newBlog).expect(400);
  const blogs = await blogsInDb();
  expect(blogs).toHaveLength(initialBlogs.length);
});

test('blog without url is not added', async () => {
  const newBlog = {
    title: 'newBlog',
    author: 'newBlog',
    likes: 1,
  };
  await api.post('/api/blogs').send(newBlog).expect(400);
  const blogs = await blogsInDb();
  expect(blogs).toHaveLength(initialBlogs.length);
});

test('blog post can be deleted', async () => {
  const blogsAtStart = await blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

  const blogsAtEnd = await blogsInDb();
  expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1);
  const titles = blogsAtEnd.map((blog) => blog.title);
  expect(titles).not.toContain(blogToDelete.title);
});

test('blog post can be updated', async () => {
  const blogsAtStart = await blogsInDb();
  const blogBeforeUpdate = blogsAtStart[0];

  const updatedBlog = {
    title: 'test',
    author: 'unknown',
    url: 'http://test.com',
    likes: 10,
  };

  await api
    .put(`/api/blogs/${blogBeforeUpdate.id}`)
    .send(updatedBlog)
    .expect(200);

  const blogsAtEnd = await blogsInDb();
  const blogAfterUpdate = blogsAtEnd[0];

  expect(blogAfterUpdate.likes).toBe(updatedBlog.likes);
});

afterAll(async () => {
  await mongoose.connection.close();
});
