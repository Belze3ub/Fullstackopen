import axios from 'axios';
import { useEffect, useState } from 'react';
import CountryInfo from './components/CountryInfo';

function App() {
  const [showCountryInfo, setShowCountryInfo] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [countries, setCountries] = useState([]);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then((response) => setCountries(response.data));
  }, []);

  const handleButtonClick = (name) => {
    showCountryInfo.includes(name)
      ? setShowCountryInfo(showCountryInfo.filter((c) => c !== name))
      : setShowCountryInfo([...showCountryInfo, name]);
  };

  return (
    <>
      find countries{' '}
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : filteredCountries.length === 1 ? (
        <CountryInfo country={filteredCountries[0]} />
      ) : (
        filteredCountries.map((country) => (
          <div key={country.name.common}>
            <p>
              {country.name.common}
              <button style={{marginLeft: '.5rem'}} onClick={() => handleButtonClick(country.name.common)}>
                {!showCountryInfo.includes(country.name.common) ? 'Show' : 'Hide'}
              </button>
            </p>
            {showCountryInfo.includes(country.name.common) && (
              <CountryInfo country={country} />
            )}
          </div>
        ))
      )}
    </>
  );
}

export default App;
