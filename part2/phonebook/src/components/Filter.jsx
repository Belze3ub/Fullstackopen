const Filter = ({ searchQuery, setSearchQuery }) => {
  return (
    <>
      filter shown with{' '}
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </>
  );
};

export default Filter;
