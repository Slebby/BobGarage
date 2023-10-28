import { configureStore } from '@reduxjs/toolkit';


export const store = configureStore({
    reducer: {
        auth: authReducerm,
        users: userReducer,
        feedback: feedbackReducer,
        blog: blogReducer
    }
});