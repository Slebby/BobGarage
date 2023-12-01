import { configureStore } from '@reduxjs/toolkit';
import feedbackReducer from '../reducer/feedbackSlice';
import authReducer from '../reducer/authSlice';
import userReducer from '../reducer/userSlice';
import blogReducer from '../reducer/blogSlice';
import carServiceReducer from '../reducer/carServiceSlice';


export const store = configureStore({
    reducer: {
        auth: authReducer,
        users: userReducer,
        feedback: feedbackReducer,
        blog: blogReducer,
        car_Service: carServiceReducer
    }
});