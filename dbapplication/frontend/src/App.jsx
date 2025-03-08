import React from 'react';
import axios from 'axios';
import UserList from './UserList';

const API_URL = 'http://localhost:3000';

export const getUsers = async () => {
    const response = await axios.get(`${API_URL}/users`);
    return response.data.users;
};

export const addUser = async (user) => {
    const response = await axios.post(`${API_URL}/add-user`, user);
    return response.data;
};

export const updateUser = async (id, user) => {
    const response = await axios.put(`${API_URL}/update-user/${id}`, user);
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await axios.delete(`${API_URL}/delete-user/${id}`);
    return response.data;
};

function App() {
    return (
        <div className="App">
            <UserList />
        </div>
    );
}

export default App;