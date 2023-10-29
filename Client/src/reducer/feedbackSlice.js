import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    feedbackList: [],
    feedback: {},
    status: 'idle',
    error: null
};

// Fetch feedback 
export const fetchFeedbackList = createAsyncThunk('feedback/fetchFeedback', async() => {
    console.log('Fetching Data...');
    try {
        const res = await axios.get('/api/feedback');
        console.log(res.data);
        return res.data;
    } catch (err) {
        return err.message;
    }
});

// Add feedback
export const addNewFeedback = createAsyncThunk('feedback/addNewFeedback', async(newFeedback) => {
    console.log('Adding new feedback...');
    try {
        const res = await axios.post('/api/feedback/add', newFeedback);
        console.log(res.data);
        return res.data;
    } catch (err) {
        return err.message;
    }
});

// Update feedback

// Delete feedback

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFeedbackList.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchFeedbackList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.feedbackList = action.payload;
            })
            .addCase(fetchFeedbackList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(addNewFeedback.fulfilled, (state, action) => {
                state.feedback = action.payload;
                state.feedbackList.push(action.payload);
            })
    }
});

export const selectAllFeedback = (state) => state.feedback.feedbackList;
export const getFeedbackStatus = (state) => state.feedback.status;
export const getFeedbackError = (state) => state.feedback.error;

export default feedbackSlice.reducer;