import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

const baseRoute = '/api/auth';

const initialState = {
    user: {},
    token: localStorage.getItem('token'),
    isStaff: false,
    isAuth: false,
    status: 'idle',
    error: null
};

// Login path api/auth,
// register path api/auth/new

export const login = createAsyncThunk('auth/login', async (credential) => {
    console.log('logging in again...');
    try {
        const res = await axios.post(baseRoute, credential);
        console.log(res.data.token);
        if (res.data) {
            if(res.status === 400){
                throw Error({ message: res.data });
            }

            localStorage.setItem('token', res.data.token);
            setAuthToken(res.data.token);
            const response = await axios.get(baseRoute);
            console.log(response.data);
            return response.data;
        }
    } catch (err) {
        return err.message;
    }
});

export const register = createAsyncThunk('auth/register', async(newUser) => {
    console.log('Creating new user...');
    try {
        const res = await axios.post(`${baseRoute}/new`, newUser);
        console.log(res.data.token); // token
        if(res.data){
            if(res.status === 400){
                throw Error({ message: res.data });
            }

            localStorage.setItem('token', res.data.token);
            setAuthToken(localStorage.token);
            const response = await axios.get(baseRoute);
            return response.data;
        }
        return res.data;
    } catch (err) {
        return err.message;
    }
});

export const loadUser = createAsyncThunk('auth/loadUser', async() => {
    try {
        const res = await axios.get(baseRoute);
        return res.data;
    } catch (err) {
        return err.message;
    }
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            console.log('Logging out... reducer');
            localStorage.removeItem('token');
            state.token = null;
            state.isAuth = false;
            state.isStaff = false;
            state.user = null;
            state.status = 'idle';
        }
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
                state.token = localStorage.getItem('token');
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'falied';
                state.isAuth = false;
                state.isStaff = false;
                state.token = null;
            })
            .addCase(loadUser.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuth = true;
                state.isStaff = action.payload.isStaff;
                state.user = action.payload;
            })
            .addCase(register.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.isAuth = true;
                state.isStaff = action.payload.isStaff;
                state.token = localStorage.getItem('token');
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed';
                state.isAuth = false;
                state.isStaff = false;
                state.token = null;
                state.error = action.error.message;
            })
    }
})

// export const getToken = (state) => state.auth.token;
export const getIsAuth = (state) => state.auth.isAuth;
export const getIsStaff = (state) => state.auth.isStaff;
export const getAuthUser = (state) => state.auth.user;
export const getAuthUserID = (state) => state.auth.user.userId;

export const { logout } = authSlice.actions;

export default authSlice.reducer;