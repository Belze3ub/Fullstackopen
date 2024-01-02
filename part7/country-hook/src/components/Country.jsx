const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.name.common} </h3>
      <div>Capital: {country.capital[0]} </div>
      <div>Population {country.population}</div>
      <img src={country.flags.png} height="100" alt={`flag of ${country.flags.alt}`} />
    </div>
  );
};

export default Country;
