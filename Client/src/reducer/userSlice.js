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

export const fetchUsers = createAsyncThunk('users/fetchUsers', async() => {
    console.log('Fetching Users...');
    try {
        const res = await axios.get(baseRoute);
        return res.data;
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
    }
});

export const selectUsers = (state) => state.users.userList;
export const selectAll_User = (state) => state.users.all_Users;
export const getUsersStatus = (state) => state.users.status;
export const getUsersErrors = (state) => state.users.errors;
export const getUserByID = (state, id) => state.users.userList.find( item => item.userId === +id);

export default userSlice.reducer;