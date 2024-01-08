import { CircleUserRound } from 'lucide-react';
import CommentForm from './CommentForm';

const Comments = ({ blog }) => {
  return (
    <>
      <h3 className="text-2xl font-bold mb-2">Comments</h3>
      <CommentForm blogId={blog.id} />
      {!blog.comments.length ? (
        <p className='text-center'>No comments</p>
      ) : (
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment._id} className="flex items-start gap-2 border rounded-2xl shadow-md p-2 mb-2">
              <CircleUserRound className='min-w-10 min-h-10' />
              <div>
                <div className='font-bold'>@Anonymous</div>
                {comment.content}
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Comments;
