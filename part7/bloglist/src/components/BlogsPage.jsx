import React, { useRef } from 'react';
import BlogForm from './BlogForm';
import Togglable from './Togglable';
import Blog from './Blog';

const BlogsPage = ({ blogs, user }) => {
  const blogFormRef = useRef();
  return (
    <>
      <h2>Blogs</h2>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      {blogs
        .toSorted((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} username={user.username} />
        ))}
    </>
  );
};

export default BlogsPage;
