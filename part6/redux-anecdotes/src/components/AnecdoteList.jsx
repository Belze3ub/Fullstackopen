import { useSelector, useDispatch } from 'react-redux';
import { upvote } from '../reducers/anecdoteReducer';
import Anecdote from './Anecdote';

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (!state.filter) return state.anecdotes;
    return state.anecdotes.filter(({ content }) =>
      content.toLowerCase().includes(state.filter)
    );
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(upvote(id));
  };

  return (
    <div>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <Anecdote key={anecdote.id} anecdote={anecdote} handleClick={() => vote(anecdote.id)} />
        ))}
    </div>
  );
};

export default AnecdoteList;
