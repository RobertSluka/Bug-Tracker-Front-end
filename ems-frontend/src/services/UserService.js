import axios from 'axios';

const API_URL = 'http://localhost:8080/users';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const listUsers = async () => {
  return await apiClient.get('/');
};

export const createUser = async (user) => {
  return await apiClient.post('/', user);
};

export const getUser = async (id) => {
  return await apiClient.get(`/${id}`);
};

export const updateUser = async (id, user) => axios.put(API_URL + '/' + id, user);

export const deleteUser = async (id) => axios.delete(API_URL + '/' + id);

export const login = async (credentials) => {
    return await apiClient.post('/login', credentials);
  };