import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    feedbackList: [],
    status: 'idle',
    error: null
};

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {

    }
})

export default feedbackSlice.reducer;