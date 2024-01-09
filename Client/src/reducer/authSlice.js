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

// register path api/auth/new
export const register = createAsyncThunk('auth/register', async(newUser) => {
    console.log('Creating new user...');
    try {
        const res = await axios.post(`${baseRoute}/new`, newUser);
        console.log(res.data);
        return res.data;
    } catch (err) {
        return err.message;
    }
});

export const verifyEmail = createAsyncThunk('auth/verifyEmail', async(token) => {
    console.log('Verifying Email');
    try {
        const res = await axios.post(`${baseRoute}/verify`, { token });
        console.log(res.data);
        if(res.data){
            if(res.status === 400){
                throw Error({ message: res.data });
            }
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
});

export const loadConfirmUser = createAsyncThunk('auth/loadConfirmUser', async(token) => {
    try {
        const res = await axios.post(`${baseRoute}/token/verify`, { token });

        return res.data;
    } catch (err) {
        throw Error(err.message);
    }
});

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
            state.user = {};
            state.status = 'idle';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                if(typeof(action.payload) !== "object"){
                    state.status = 'error';
                    state.error = action.payload;
                    return;
                }
                state.status = 'succeeded';
                state.user = action.payload;
                state.isAuth = true;
                state.isStaff = action.payload.isStaff;
                state.token = localStorage.getItem('token');
                state.error = null;
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
                state.error = null;
            })
            .addCase(register.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(register.fulfilled, (state, action) => {
                if(typeof(action.payload) !== "object"){
                    state.status = 'error';
                    state.error = action.payload;
                    return;
                }
                state.status = 'succeeded';
                state.isAuth = true;
                state.isStaff = action.payload.isStaff;
                state.token = null;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed';
                state.isAuth = false;
                state.isStaff = false;
                state.token = null;
                state.error = action.error.message;
            })
            .addCase(verifyEmail.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(verifyEmail.fulfilled, (state, action) => {
                if(action.payload === 'Failed to verify'){
                    state.status = 'error';
                    state.error = "Invalid Verification Link";
                    return;
                }
                state.status = 'succeeded';
                state.isAuth = false;
                state.isStaff = false;
                state.token = null;
                state.user = {};
                state.error = null;
            })
            .addCase(verifyEmail.rejected, (state, action) => {
                state.status = 'failed';
                state.isAuth = false;
                state.isStaff = false;
                state.token = null;
                state.error = action.error.message;
            })
            .addCase(loadConfirmUser.fulfilled, (state, action) => {
                state.status = 'succeeded',
                state.isAuth = false;
                state.isStaff = false;
                state.token = null;
                state.user = action.payload;
                state.error = null;
            })
            .addCase(loadConfirmUser.rejected, (state, action) => {
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
export const getAuthStatus = (state) => state.auth.status;
export const getAuthUserUsername = (state) => state.auth.user.username;
export const getAuthUserImage = (state) => state.auth.user.userImage;
export const getUserEmailVerify = (state) => state.auth.user.email_Verified;
export const getError = (state) => state.auth.error;

export const { logout } = authSlice.actions;

export default authSlice.reducer;