import { useState } from 'react';

const Blog = ({ blog, updateBlog, deleteBlog, username }) => {
  const blogStyle = {
    border: 'solid',
    borderWidth: 1,
    marginBlock: 5,
    padding: 5,
  };
  const buttonStyle = { marginLeft: 5 };
  const [showMore, setShowMore] = useState(false);

  const handleLike = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    await updateBlog(updatedBlog);
  };

  const handleRemove = async () => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      await deleteBlog(blog.id);
    } else return null;
  };

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button style={buttonStyle} onClick={() => setShowMore(!showMore)}>
          {showMore ? 'close' : 'view'}
        </button>
      </div>
      {showMore && (
        <div>
          <a href={blog.url}>{blog.url}</a>
          <div>
            likes {blog.likes}{' '}
            <button style={buttonStyle} onClick={handleLike}>
              like
            </button>
          </div>
          <div>{blog.user.username}</div>
          {blog.user.username === username && (
            <button
              style={{ backgroundColor: 'lightblue' }}
              onClick={handleRemove}
            >
              remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
