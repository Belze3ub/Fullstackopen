import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAnecdote } from '../../services/requests';
import useSetNotificationFn from '../hooks/useSetNotificationFn';

const AnecdoteList = ({ anecdotes }) => {
  const setNotificationMessage = useSetNotificationFn();

  const queryClient = useQueryClient();
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (anecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      const newAnecdotes = anecdotes.map((oldAnecdote) =>
        oldAnecdote.id !== anecdote.id ? oldAnecdote : anecdote
      );
      queryClient.setQueryData(['anecdotes'], newAnecdotes);
    },
  });

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    setNotificationMessage(`'${anecdote.content}' upvoted`);
  };
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
