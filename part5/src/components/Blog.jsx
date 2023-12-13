import { useState } from 'react';

const Blog = ({ blog }) => {
  const blogStyle = {
    border: 'solid',
    borderWidth: 1,
    marginBlock: 5,
    padding: 5,
  };
  const buttonStyle = { marginLeft: 5 };
  const [showMore, setShowMore] = useState(false);

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
            likes {blog.likes} <button style={buttonStyle}>like</button>
          </div>
          <div>{blog.author}</div>
        </div>
      )}
    </div>
  );
};

export default Blog;
