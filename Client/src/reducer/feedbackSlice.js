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
export const updateFeedback = createAsyncThunk('feedback/updateFeedback', async(feedback) => {
    console.log(`Updating feedback id: ${feedback.feedId}`);
    const id = feedback.feedId;
    try {
        const res = await axios.put(`/api/feedback/edit/${id}`, feedback);
        console.log(res.data);
        return res.data;
    } catch (err) {
        return err.message;
    }
});

// Delete feedback
export const removeFeedback = createAsyncThunk('feedback/removeFeedback', async(id) => {
    console.log(`Deleting feedback: ${id}`);
    try {
        const res = await axios.delete(`/api/feedback/delete/${id}`);
        if (res.status === 200) return id;
        return `${res.status}: ${res.statusText}`;
    } catch (err) {
        return err.message;
    }
});

// Get single Feedback
export const getSingleFeedback = createAsyncThunk('feedback/getSingleFeedabck', async(id) => {
    console.log('Getting single feedback');
    try {
        const res = await axios.get(`/api/feedback/edit/${id}`);
        console.log(res.data);
        return res.data;
    } catch (err) {
        return err.message;
    }
})

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
            .addCase(updateFeedback.fulfilled, (state, action) => {
                if (!action.payload) {
                    console.log('Update could not complete');
                    return;
                }

                const { feedId } = action.payload;
                const newFeedList = state.feedbackList.filter( item => item.feedId !== feedId );
                // state.feedbackList = [...newFeedList, action.payload];
                state.feedback = action.payload;
            })
            .addCase(removeFeedback.fulfilled, (state, action) => {
                if (!action.payload?.id) {
                    console.log('Delete could not complete');
                    console.log(action.payload);
                    return;
                }

                const { feedId } = action.payload;
                const newFeedList = state.feedbackList.filter( item => item.feedId !== feedId );
                state.feedbackList = newFeedList;
            })
            .addCase(getSingleFeedback.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.feedback = action.payload;
            })
    }
});

export const selectAllFeedback = (state) => state.feedback.feedbackList;
export const getFeedbackStatus = (state) => state.feedback.status;
export const getFeedbackError = (state) => state.feedback.error;
export const selectFeedbackByID = (state, id) => state.feedback.feedbackList.find(item => item.feedId === +id);

export default feedbackSlice.reducer;