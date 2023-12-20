import AnecdoteForm from './components/AnecdoteForm';
import Notification from './components/Notification';
import { useQuery } from '@tanstack/react-query';
import { getAnecdotes } from '../services/requests';
import AnecdoteList from './components/AnecdoteList';

const App = () => {
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
  });

  if (result.isLoading) return <p>Loading...</p>;
  const anecdotes = result.data;
  const error = result.error;


  return (
    <div>
      {error ? (
        <p>Anecdote service not available due to problems in server</p>
      ) : (
        <>
          <Notification />
          <h3>Anecdote app</h3>

          <AnecdoteForm />
          <AnecdoteList anecdotes={anecdotes} />
          {/* {anecdotes.map((anecdote) => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
              </div>
            </div>
          ))} */}
        </>
      )}
    </div>
  );
};

export default App;
