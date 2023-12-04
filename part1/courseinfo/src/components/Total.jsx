const Total = (props) => {
  const total = props.parts.reduce((accu, value) => accu + value.exercises, 0);
  return <p>Number of exercises {total}</p>;
};

export default Total;
