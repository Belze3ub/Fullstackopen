import axios from 'axios';

const getAll = () => {
  return axios
    .get('http://localhost:3000/persons')
    .then((response) => response.data);
};

const create = (newObject) => {
  return axios
    .post('http://localhost:3000/persons', newObject)
    .then((response) => response.data);
};

const deletePerson = (id) => {
  axios.
    delete(`http://localhost:3000/persons/${id}`)
}

const update = (id, newObject) => {
  return axios
    .put(`http://localhost:3000/persons/${id}`, newObject)
    .then((response) => response.data);
};

export default {getAll, create, deletePerson, update}
