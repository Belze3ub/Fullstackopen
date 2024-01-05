import React, { useRef } from 'react';
import BlogForm from './BlogForm';
import Togglable from './Togglable';
import Blog from './Blog';

const BlogsPage = ({ blogs }) => {
  const blogFormRef = useRef();
  console.log(blogs)
  return (
    <>
      <h2>Blogs</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </>
  );
};

export default BlogsPage;
