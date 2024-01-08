import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { deleteBlog, upvoteBlog } from '../reducers/blogReducer';
import Comments from './Comments';
import { Button } from './ui/button';
import { Heart, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

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
    dispatch(deleteBlog(blog.id));
  };

  if (!blog) return null;

  return (
    <>
      <div className="border shadow-md p-3 flex flex-col gap-2 rounded-lg">
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
        <div className="flex gap-2">
          <Button onClick={handleLike} variant="outline">
            <div className="flex items-center">
              <Heart className="h-4 w-4 mr-1" />
              Like
            </div>
          </Button>
          {blog.user.username === user.username && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your blog post.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleRemove}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>
      <Comments blog={blog} />
    </>
  );
};

export default BlogPage;
