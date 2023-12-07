import axios from 'axios';
const baseURL = import.meta.env.VITE_BASE_URL;

const getAll = () => {
  return axios.get(baseURL).then((response) => response.data);
};

const create = (newObject) => {
  return axios.post(baseURL, newObject).then((response) => response.data);
};

const deletePerson = (id) => {
  axios.delete(`${baseURL}/${id}`);
}

const update = (id, newObject) => {
  return axios
    .put(`${baseURL}/${id}`, newObject)
    .then((response) => response.data);
};

export default {getAll, create, deletePerson, update}
