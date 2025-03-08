import React, { useState, useEffect } from 'react';
import { getUsers, addUser, updateUser, deleteUser } from './api';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [search, setSearch] = useState('');
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    useEffect(() => {
        setFilteredUsers(
            users.filter(user =>
                user.name.toLowerCase().includes(search.toLowerCase()) ||
                user.email.toLowerCase().includes(search.toLowerCase()) ||
                user.role.toLowerCase().includes(search.toLowerCase())
            )
        );
    }, [search, users]);

    const fetchUsers = async () => {
        const users = await getUsers();
        setUsers(users);
    };

    const handleAddUser = async () => {
        await addUser({ name, email, role });
        fetchUsers();
    };

    const handleUpdateUser = async (id) => {
        await updateUser(id, { name, email, role });
        fetchUsers();
    };

    const handleDeleteUser = async (id) => {
        await deleteUser(id);
        fetchUsers();
    };

    return (
        <div>
            <h1>User List</h1>
            <input
                type="text"
                placeholder="Search by name, email, or role"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="text"
                placeholder="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
            />
            <button onClick={handleAddUser}>Add User</button>
            <ul>
                {filteredUsers.map((user) => (
                    <li key={user.id}>
                        {user.name} ({user.email}) - {user.role}
                        <button onClick={() => handleUpdateUser(user.id)}>Update</button>
                        <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;