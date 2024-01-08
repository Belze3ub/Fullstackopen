import axios from 'axios';
const baseUrl = 'https://blogapp-zbgm.onrender.com/api/users';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newUser) => {
  const response = await axios.post(baseUrl, newUser)
  return response.data;
}

export default { getAll, create };
