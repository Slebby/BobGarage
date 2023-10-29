import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    blogList: [],
    blog: {},
    status: 'idle',
    error: null
};

// Fetch all Blogs
export const fetchBlogList = createAsyncThunk('blog/fetchBlogList', async() => {
    console.log('Getting all blogs');
    try {
        const res = await axios.get('/api/blog');
        console.log(res.data);
        return res.data;
    } catch (err) {
        return err.message;
    }
})

// Add blog

// Update blog

// Delete blog

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            .addCase(fetchBlogList.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchBlogList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.blogList = action.payload;
            })
            .addCase(fetchBlogList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const selectAllBlogs = (state) => state.blog.blogList;
export const getBlogStatus = (state) => state.blog.status;
export const getBlogError = (state) => state.blog.error;

export default blogSlice.reducer;