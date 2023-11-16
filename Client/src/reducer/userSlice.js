import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseRoute = '/api/users';

const initialState = {
    userList: [],
    all_Users: [],
    user: {},
    status: 'idle',
    errors: {}
};

// get all information
export const fetchUsers = createAsyncThunk('users/fetchUsers', async() => {
    console.log('Fetching Users...');
    try {
        const res = await axios.get(baseRoute);
        return res.data;
    } catch (err) {
        return err.message;
    }
});

// get only the names
export const fetchUsersNames = createAsyncThunk('users/fetchUsersNames', async() => {
    console.log('Fetching Users Names...');
    try {
        const res = await axios.get(`${baseRoute}/names`);
        return res.data;
    } catch (err) {
        return err.message;
    }
});

// Delete user
export const removeUser = createAsyncThunk('users/removeUser', async(id) => {
    console.log(`Delete User ${id}`);
    try {
        const res = await axios.delete(`${baseRoute}/delete/${id}`);
        if (res.status === 200) return id;
        return `${res.status}: ${res.statusText}`;
    } catch (err) {
        return err.message;
    }
});

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUsers.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userList = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.status = 'failed';
                state.errors = action.error.message;
            })
            .addCase(fetchUsersNames.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchUsersNames.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.all_Users = action.payload;
            })
            .addCase(fetchUsersNames.rejected, (state, action) => {
                state.status = 'failed';
                state.all_Users = action.error.message;
            })
            .addCase(removeUser.fulfilled, (state, action) => {
                if (!action.payload) {
                    console.log('Delete could not complete');
                    console.log(action.payload);
                    return;
                }

                const userId = action.payload;
                const newUserList = state.userList.filter( item => item.userId !== userId);
                state.userList = newUserList;
            })
    }
});

export const selectUsers = (state) => state.users.userList;
export const selectAll_User = (state) => state.users.all_Users;
export const getUsersStatus = (state) => state.users.status;
export const getUsersErrors = (state) => state.users.errors;
export const getUserByID = (state, id) => state.users.userList.find( item => item.userId === +id);

export default userSlice.reducer;