import axios from 'axios';
// const baseUrl = '/api/blogs';
const baseUrl = 'http://localhost:3000/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config);
  return response.data;
};

const deleteBlog = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${blogId}`, config);
};

const addComment = async (blogId, comment) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(
    `${baseUrl}/${blogId}/comments`,
    comment,
    config
  );
  return response.data;
};

export default { getAll, setToken, create, update, deleteBlog, addComment };
