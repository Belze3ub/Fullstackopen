const Anecdote = ({anecdote}) => {
  return (
    <>
      <h2>{anecdote.content}</h2>
      <p>Has {anecdote.votes} votes</p>
      <p>For more info see {anecdote.info}</p>
    </>
  );
}

export default Anecdote