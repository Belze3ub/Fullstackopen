import CommentForm from './CommentForm';

const Comments = ({ blog }) => {
  return (
    <>
      <h3>Comments</h3>
      <CommentForm blogId={blog.id} />
      {!blog.comments.length ? (
        <p>No comments</p>
      ) : (
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment._id}>{comment.content}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Comments;
