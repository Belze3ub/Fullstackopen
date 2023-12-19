import { createSlice } from '@reduxjs/toolkit';

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload;
    },
    addAnecdote(state, action) {
      const anecdote = asObject(action.payload);
      state.push(anecdote);
    },
    upvote(state, action) {
      const id = action.payload;
      return state.map((anecdote) =>
        anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      );
    },
  },
});

export const { addAnecdote, upvote, setAnecdotes } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
