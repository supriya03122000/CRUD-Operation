import React, { useState, useEffect } from 'react';
import { getUsers, deleteUser } from '../UserService';

function UserList({ users, onEditUser, onDeleteUser }) {
  const [loading, setLoading] = useState(false);

  const handleDeleteUser = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (confirmed) {
      setLoading(true);
      try {
        await onDeleteUser(id);
      } catch (error) {
        console.error('Error deleting user:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>User List</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.dob}</td>
              <td>
                <button onClick={() => onEditUser(user)} className="btn btn-warning btn-sm mx-2">
                  Edit
                </button>
                <button onClick={() => handleDeleteUser(user.id)} className="btn btn-danger btn-sm ml-2">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
