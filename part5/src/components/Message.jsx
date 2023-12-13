import '../styles.css'

const Message = ({message}) => {
  const { content, type } = message;

  return <p className={`message-${type}`}>{content}</p>;
}

export default Message