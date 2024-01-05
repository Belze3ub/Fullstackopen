import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteBlog, upvoteBlog } from '../reducers/blogReducer';
import Comments from './Comments';

const BlogPage = ({ blogs, user }) => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const blog = blogs.find((blog) => blog.id === id);

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };
    dispatch(upvoteBlog(updatedBlog));
  };

  const handleRemove = () => {
    if (confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      dispatch(deleteBlog(blog.id));
    } else return null;
  };

  if (!blog) return null;

  return (
    <>
      <h2>{blog.title} {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}
        <button onClick={handleLike} style={{ marginLeft: '.5rem' }}>
          like
        </button>
      </div>
      <div>added by {user.username}</div>
      {blog.user.username === user.username && (
        <button style={{ backgroundColor: 'lightblue' }} onClick={handleRemove}>
          remove
        </button>
      )}
      <Comments blog={blog} />
    </>
  );
};

export default BlogPage;
