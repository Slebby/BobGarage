import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    auth: {},
    token: null,
    isStaff: false,
    isAuth: false,
    status: 'idle',
    error: null
};

// Login path api/user,
// register path api/users/new

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
    console.log('logging in again...');
    try {
        const res = await axios.post('/api/user', ({ email, password }));
        console.log(res.data);
        return res.data;
    } catch (err) {
        return err.message;
    }
})

export const register = createAsyncThunk('auth/register', async(newUser) => {
    console.log('Creating new user...');
    try {
        const res = await axios.post('/api/user/new', newUser);
        console.log(res.data);
        return res.data;
    } catch (err) {
        return err.message;
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuth = true;
                state.isStaff = action.payload.isStaff;
                state.token = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'falied';
                state.isAuth = false;
                state.isStaff = false;
                state.token = null;
            })
    }
})

export const getToken = (state) => state.auth.token;
export const getIsAuth = (state) => state.auth.isAuth;
export const getIsStaff = (state) => state.auth.isStaff;
export const getAuthUser = (state) => state.auth.auth;

export default authSlice.reducer;