const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const api = supertest(app);
const Blog = require('../models/blog');
const {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  getToken,
  favoriteBlog,
  mostBlogs,
  mostLikes,
} = require('./testHelper');

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of initialBlogs) {
    const blogObject = new Blog(blog);
    await blogObject.save();
  }
});

test('all blogs are returned', async () => {
  const token = await getToken();
  const response = await api
    .get('/api/blogs')
    .set('Authorization', `Bearer ${token}`);
  expect(response.body).toHaveLength(initialBlogs.length);
});

test('a specific blog is within the returned blogs', async () => {
  const token = await getToken();
  const response = await api
    .get('/api/blogs')
    .set('Authorization', `Bearer ${token}`);
  const title = response.body.map((blog) => blog.title);
  expect(title).toContain('test');
});

test('unique identifier is named "id"', async () => {
  const token = await getToken();
  const response = await api
    .get('/api/blogs')
    .set('Authorization', `Bearer ${token}`);
  const blog = response.body[0];
  expect(Object.keys(blog)).toContain('id');
});

test('valid blog post can be added', async () => {
  const token = await getToken();
  const newBlog = {
    title: 'newBlog',
    author: 'newBlog',
    url: 'http://newBlog.com',
    likes: 1,
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${token}`)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  const blogs = await blogsInDb();
  expect(blogs).toHaveLength(initialBlogs.length + 1);

  const titles = blogs.map((blog) => blog.title);
  expect(titles).toContain('newBlog');
});

test('if blog don\'t have "likes" property then likes equals 0', async () => {
  const token = await getToken();
  const newBlog = {
    title: 'newBlog',
    author: 'newBlog',
    url: 'http://newBlog.com',
  };
  const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);
  expect(response.body.likes).toBe(0);
});

test('blog without title is not added', async () => {
  const token = await getToken();
  const newBlog = {
    author: 'newBlog',
    url: 'http://newBlog.com',
    likes: 1,
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${token}`)
    .expect(400);
  const blogs = await blogsInDb();
  expect(blogs).toHaveLength(initialBlogs.length);
});

test('blog without url is not added', async () => {
  const token = await getToken();
  const newBlog = {
    title: 'newBlog',
    author: 'newBlog',
    likes: 1,
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .set('Authorization', `Bearer ${token}`)
    .expect(400);
  const blogs = await blogsInDb();
  expect(blogs).toHaveLength(initialBlogs.length);
});

test('blog post can be deleted', async () => {
  const token = await getToken();
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://test.com',
    likes: 0,
  };
  const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201);
  const blogToDelete = response.body;

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204);

  const blogsAtEnd = await blogsInDb();
  expect(blogsAtEnd).toHaveLength(initialBlogs.length);
  const titles = blogsAtEnd.map((blog) => blog.title);
  expect(titles).not.toContain(blogToDelete.title);
});

test('blog post can be updated', async () => {
  const token = await getToken();
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
    .set('Authorization', `Bearer ${token}`)
    .expect(200);

  const blogsAtEnd = await blogsInDb();
  const blogAfterUpdate = blogsAtEnd[0];

  expect(blogAfterUpdate.likes).toBe(updatedBlog.likes);
});

describe('Favorites blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    for (let blog of initialBlogs) {
      const blogObject = new Blog(blog);
      await blogObject.save();
    }
  });
  test('return the most liked blog', async () => {
    const blogs = await blogsInDb();
    const favorite = favoriteBlog(blogs);
    expect(favorite).toEqual(initialBlogs[0]);
  });

  test('return author with most blogs', async () => {
    const blogs = await blogsInDb();
    const mBlogs = mostBlogs(blogs);
    expect(mBlogs).toEqual({
      author: 'unknown',
      blogs: 2,
    });
  });

  test('return author with most likes', async () => {
    const blogs = await blogsInDb();
    const mLikes = mostLikes(blogs);
    expect(mLikes).toEqual({
      author: 'unknown',
      likes: 16,
    });
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
