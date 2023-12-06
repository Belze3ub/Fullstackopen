import WeatherInfo from './WeatherInfo';

function CountryInfo({ country }) {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="Flag" width="200" />
      <WeatherInfo lat={country.latlng[0]} lon={country.latlng[1]} />
    </div>
  );
}

export default CountryInfo;
