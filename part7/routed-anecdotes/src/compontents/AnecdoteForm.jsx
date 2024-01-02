import { useNavigate } from "react-router-dom";
import { useField } from "../hooks/useField";

const AnecdoteForm = ({addNew, setNotification}) => {

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')

  const navigate = useNavigate();

  const handleNotification = (content) => {
    setNotification(`A new anecdote '${content}' created!`);
    setTimeout(() => {
      setNotification('');
    }, 5000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    navigate('/');
    handleNotification(content.value);
  };

  const handleReset = () => {
    content.onReset();
    author.onReset();
    info.onReset();
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button>Create</button>
        <button type="reset" onClick={handleReset}>Reset</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;