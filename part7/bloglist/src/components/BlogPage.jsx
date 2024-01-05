import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteBlog, upvoteBlog } from '../reducers/blogReducer';
import Comments from './Comments';
import { Button } from './ui/button';
import { Heart, Trash2 } from 'lucide-react';

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
      <div className="shadow-md p-3 flex flex-col gap-2">
        <h2 className="font-bold text-2xl">{blog.title}</h2>
        <a href={blog.url} className="text-blue-600 hover:underline">
          {blog.url}
        </a>
        <div className="text-gray-500">Author: {blog.author}</div>
        <div>
          Added by: <span className="font-bold">{user.username}</span>
        </div>
        <div className="flex gap-1 items-center">
          <Heart color="red" size={'1rem'} />
          {blog.likes} {blog.likes === 1 ? 'like' : 'likes'}
        </div>
        <div className='flex gap-2'>
          <Button onClick={handleLike} variant="outline">
            <div className="flex items-center">
              <Heart className="h-4 w-4 mr-1" />
              Like
            </div>
          </Button>
          {blog.user.username === user.username && (
            <Button variant="outline" onClick={handleRemove}>
              <Trash2 className="h-4 w-4 mr-1" />
              Delete
            </Button>
          )}
        </div>
      </div>
      <Comments blog={blog} />
    </>
  );
};

export default BlogPage;
