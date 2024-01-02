import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';

const useResource = (baseUrl, endpoint) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}${endpoint}`).then((res) => {
      setResources(res.data);
    });
  }, [baseUrl, endpoint]);

  const create = (resource) => {
    return axios
      .post(`${baseUrl}${endpoint}`, resource)
      .then(res => {
        const newResource = {...resource, id: res.data.id};
        setResources([...resources, newResource])
      })
      .catch((error) => console.error('Error adding new value', error));
  };

  const service = {
    create,
  };

  return [resources, service];
};

export default useResource;
