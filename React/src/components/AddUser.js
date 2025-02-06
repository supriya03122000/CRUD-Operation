import React, { useState, useEffect } from 'react';
import { getUsers, addUser, updateUser, deleteUser } from '../UserService';
import UserList from './UserList';

export default function AddUser() {
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', dob: '' });
    const [users, setUsers] = useState([]); 
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [editing, setEditing] = useState(false); 
    const [currentUserId, setCurrentUserId] = useState(null); 

    
    const validate = () => {
        const errors = {};
        if (!newUser.name) {
            errors.name = 'Name is required';
        }
        if (!newUser.email) {
            errors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(newUser.email)) {
            errors.email = 'Email is not valid';
        }
        if (!editing && !newUser.password) {  
            errors.password = 'Password is required';
        }
        if (!newUser.dob) {
            errors.dob = 'Date of birth is required';
        }
        return errors;
    };


    const loadUsers = async () => {
        try {
            const response = await getUsers();
            setUsers(response.data.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);


    const handleSaveUser = async () => {
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setLoading(true);
        try {
            if (editing) {
                const userData = { 
                    id: currentUserId, 
                    name: newUser.name, 
                    email: newUser.email,
                    dob: newUser.dob,  
                    password: newUser.password || '' 
                };
                await updateUser(userData); 
            } else {
                await addUser(newUser);
            }
            setNewUser({ name: '', email: '', password: '', dob: '' });
            setEditing(false); 
            setCurrentUserId(null);
            loadUsers(); 
        } catch (error) {
            console.error('Error saving user:', error);
        } finally {
            setLoading(false);
        }
    };


    const handleEditUser = (user) => {
        setNewUser({ name: user.name, email: user.email, dob: user.dob, password: '' }); 
        setEditing(true);
        setCurrentUserId(user.id);
    };


    const handleDeleteUser = async (id) => {
        try {
            await deleteUser(id);
            loadUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
            <h2>{editing ? 'Edit User' : 'Add User'}</h2>
            <input
                type="text"
                className="form-control mb-2"
                placeholder="Name"
                value={newUser.name}
                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}

            <input
                type="email"
                className="form-control mb-2"
                placeholder="Email"
                value={newUser.email}
                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}

            
            {!editing && (
                <>
                    <input
                        type="password"
                        className="form-control mb-2"
                        placeholder="Password"
                        value={newUser.password}
                        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    />
                    {errors.password && <div className="text-danger">{errors.password}</div>}
                </>
            )}
<label>Date Of Birth</label>
            <input
                type="date"
                className="form-control mb-2"
                value={newUser.dob}
                onChange={(e) => setNewUser({ ...newUser, dob: e.target.value })}
            />
            {errors.dob && <div className="text-danger">{errors.dob}</div>}

            <button onClick={handleSaveUser} className="btn btn-primary mb-4" disabled={loading}>
                {loading ? (editing ? 'Updating...' : 'Adding...') : editing ? 'Update User' : 'Add User'}
            </button>

            <UserList
                users={users}
                onEditUser={handleEditUser}
                onDeleteUser={handleDeleteUser}
            />
        </div>
    );
}
