import React from 'react'; 
import { describe, it, expect, beforeEach, afterEach } from "vitest"; 
import axios from "axios";
import { getUsers, addUser, updateUser, deleteUser } from "../src/App";
import MockAdapter from "axios-mock-adapter";

const API_URL = "http://localhost:3000";

describe("API functions", () => {
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.restore();
    });

    it("getUsers fetches user list", async () => {
        const mockData = { users: [{ id: 1, name: "John Doe" }] };
        mock.onGet(`${API_URL}/users`).reply(200, mockData);

        const users = await getUsers();
        expect(users).toEqual(mockData.users);
    });

    it("addUser sends user data and returns response", async () => {
        const newUser = { name: "Jane Doe" };
        const mockResponse = { success: true, user: newUser };
        mock.onPost(`${API_URL}/add-user`).reply(201, mockResponse);

        const response = await addUser(newUser);
        expect(response).toEqual(mockResponse);
    });

    it("updateUser sends updated data and returns response", async () => {
        const updatedUser = { name: "John Updated" };
        const mockResponse = { success: true, user: updatedUser };
        mock.onPut(`${API_URL}/update-user/1`).reply(200, mockResponse);

        const response = await updateUser(1, updatedUser);
        expect(response).toEqual(mockResponse);
    });

    it("deleteUser removes user and returns response", async () => {
        const mockResponse = { success: true };
        mock.onDelete(`${API_URL}/delete-user/1`).reply(200, mockResponse);

        const response = await deleteUser(1);
        expect(response).toEqual(mockResponse);
    });

    it("getUsers handles API error", async () => {
        mock.onGet(`${API_URL}/users`).reply(500);

        await expect(getUsers()).rejects.toThrow();
    });
});
