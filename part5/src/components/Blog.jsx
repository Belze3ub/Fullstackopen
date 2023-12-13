import { useState } from 'react';

const Blog = ({ blog, updateBlog }) => {
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

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}
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
          <div>{blog.author}</div>
        </div>
      )}
    </div>
  );
};

export default Blog;
