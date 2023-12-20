import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addAnecdote } from '../../services/requests';
import useSetNotificationFn from '../hooks/useSetNotificationFn';

const AnecdoteForm = () => {
  const setNotificationMessage = useSetNotificationFn();
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes']);
      queryClient.setQueryData(['anecdotes'], [...anecdotes, newAnecdote]);
    },
    onError: (error) => {
      setNotificationMessage(error.response.data.error);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = '';
    setNotificationMessage(`New anecdote '${content}' added`);
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
