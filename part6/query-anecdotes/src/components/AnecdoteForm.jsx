import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addAnecdote } from '../../services/requests';
import { useContext } from 'react';
import NotificationContext from '../NotificationContext';

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext);
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], [...anecdotes, newAnecdote]);
    },
  });

  const setNotification = (content) => {
    notificationDispatch({
      type: 'SET_NOTIFICATION',
      payload: `New anecdote '${content}' added.`,
    });
    setTimeout(
      () =>
        notificationDispatch({
          type: 'REMOVE_NOTIFICATION',
        }),
      5000
    );
  };

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    setNotification(content);
    newAnecdoteMutation.mutate({
      content,
      votes: 0,
    });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
