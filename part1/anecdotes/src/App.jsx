import { useState } from 'react';
import Button from './components/Button';

function App() {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.',
  ];

  const [selected, setSelected] = useState(0);
  const [anecdotesState, setAnecdotesState] = useState(
    anecdotes.map((anecdote) => ({ anecdote, votes: 0 }))
  );
  const [mostVotedIndex, setMostVotedIndex] = useState(0);

  const handleNext = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
  };

  const handleVote = () => {
    const updatedAnecdoteState = [...anecdotesState];
    const newVoteCount = updatedAnecdoteState[selected].votes + 1;
    updatedAnecdoteState[selected] = {
      ...updatedAnecdoteState[selected],
      votes: newVoteCount,
    };
    setAnecdotesState(updatedAnecdoteState);
    if (newVoteCount > updatedAnecdoteState[mostVotedIndex].votes) {
      setMostVotedIndex(selected);
    }
  };

  return (
    <>
      <p>{anecdotesState[selected].anecdote}</p>
      <p>
        has {anecdotesState[selected].votes}{' '}
        {anecdotesState[selected].votes === 1 ? 'vote' : 'votes'}
      </p>
      <Button text="vote" handleClick={handleVote} />
      <Button text="next anecdote" handleClick={handleNext} />

      <h1>Anecdote with most votes</h1>
      <p>{anecdotesState[mostVotedIndex].anecdote}</p>
      <p>
        has {anecdotesState[mostVotedIndex].votes}{' '}
        {anecdotesState[mostVotedIndex].votes === 1 ? 'vote' : 'votes'}
      </p>
    </>
  );
}

export default App;
