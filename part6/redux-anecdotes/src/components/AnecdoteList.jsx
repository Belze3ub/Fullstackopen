import { useSelector, useDispatch } from 'react-redux';
import { upvoteAnecdote } from '../reducers/anecdoteReducer';
import Anecdote from './Anecdote';
import { removeNotification, setNotification } from '../reducers/notificationReducer';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (!state.filter) return state.anecdotes;
    return state.anecdotes.filter(({ content }) =>
      content.toLowerCase().includes(state.filter)
    );
  });
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(upvoteAnecdote(anecdote));
  };

  const updateNotification = (content) => {
    dispatch(setNotification(`you voted '${content}'`));
    setTimeout(() => dispatch(removeNotification()), 5000);
  };

  const handleClick = (anecdote) => {
    vote(anecdote);
    updateNotification(anecdote.content);
  };

  return (
    <div>
      {anecdotes
        .toSorted((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => {
              handleClick(anecdote);
            }}
          />
        ))}
    </div>
  );
};

export default AnecdoteList;
