import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateAnecdote } from '../../services/requests';
import { useContext } from 'react';
import NotificationContext from '../NotificationContext';

const AnecdoteList = ({ anecdotes }) => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
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

  const setNotification = (content) => {
    notificationDispatch({
      type: 'SET_NOTIFICATION',
      payload: `'${content}' upvoted.`,
    });
    setTimeout(
      () =>
        notificationDispatch({
          type: 'REMOVE_NOTIFICATION',
        }),
      5000
    );
  };

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    setNotification(anecdote.content);
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
