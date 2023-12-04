import StatisticLine from "./StatisticLine";

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  return (
    <>
      <h1>Statistics</h1>
      {total ? (
        <div>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positive} />
        </div>
      ) : (
        'No feedback given'
      )}
    </>
  );
};

export default Statistics;
