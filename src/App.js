import React, { useState, useEffect } from 'react';
import { getUsers, addUser, updateUser, deleteUser } from './UserService';
import AddUser from './components/AddUser';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', dob: '' });
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async () => {
    if (editUser) {
      setLoading(true);
      try {
        await updateUser(editUser);
        loadUsers();
        setEditUser(null);
      } catch (error) {
        console.error('Error updating user:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteUser = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      setLoading(true);
      try {
        await deleteUser(id);
        loadUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center text-primary mb-4">User CRUD</h1>

      <AddUser />
     
      {loading && <div className="text-center mt-4"><div className="spinner-border text-primary" role="status"></div></div>}
      
    </div>
  );
}

export default App;
