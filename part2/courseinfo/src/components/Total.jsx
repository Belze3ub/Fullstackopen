const Total = (props) => {
  const total = props.parts.reduce((accu, value) => accu + value.exercises, 0);
  return <p style={{fontWeight: 'bold'}}>Total of {total} exercises</p>;
};

export default Total;
