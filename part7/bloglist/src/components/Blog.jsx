import { Link } from 'react-router-dom';

const Blog = ({ blog, username }) => {
  const blogStyle = {
    border: 'solid',
    borderWidth: 1,
    marginBlock: 5,
    padding: 5,
  };

  return (
    <div style={blogStyle}>
      <div className="blog">
        <Link to={`blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </div>
    </div>
  );
};

export default Blog;
