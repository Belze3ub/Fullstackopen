import '../styles.css';

const Notification = ({ notification }) => {
  const { content, type } = notification;

  return <p className={`notification-${type}`}>{content}</p>;
};

export default Notification;
