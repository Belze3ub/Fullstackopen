import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addComment } from '../reducers/blogReducer';

const CommentForm = ({ blogId }) => {
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      content: comment,
    };
    dispatch(addComment(blogId, newComment));
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button>Add comment</button>
    </form>
  );
};

export default CommentForm;
