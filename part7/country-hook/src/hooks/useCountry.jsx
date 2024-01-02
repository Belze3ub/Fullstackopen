import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    if (!name) {
      setCountry(null);
      return;
    }
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
      .then((res) => setCountry({ ...res.data, found: true }))
      .catch(() => setCountry({ found: false }));
  }, [name]);

  return country;
};

export default useCountry;
