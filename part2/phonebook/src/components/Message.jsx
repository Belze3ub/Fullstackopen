import '../index.css';

const Message = ({ message }) => {
  const { content, type } = message;
  if (!content) return null;
  return (
    <div className={`message-${type}`}>
      <p>{content}</p>
    </div>
  );
};

export default Message;
