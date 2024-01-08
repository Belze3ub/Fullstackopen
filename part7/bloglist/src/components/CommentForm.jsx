import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../reducers/blogReducer';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';

const CommentForm = ({ blogId }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      content: comment,
    };
    if (comment) {
      dispatch(addComment(blogId, newComment));
      setComment('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='mb-2'>
      <Textarea
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder='Enter your comment'
      />
      <Button className='w-full mt-2'>Add comment</Button>
    </form>
  );
};

export default CommentForm;
