import axios from 'axios';

const API_URL = 'http://localhost/crud-php/'; // Update with your PHP API endpoint

const getUsers = () => axios.get(API_URL + 'getUser.php');
const getUser = (id) => axios.get(`${API_URL}?id=${id}`);
const addUser = (user) => axios.post(API_URL + 'register.php', user);
const updateUser = (user) => axios.put(API_URL + 'updateUser.php', user);
const deleteUser = (id) => axios.delete(API_URL + 'delete.php', { data: { id } });

export { getUsers, getUser, addUser, updateUser, deleteUser };
