import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseRoute = '/api/blog';

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
        const res = await axios.get(baseRoute);
        console.log(res.data);
        return res.data;
    } catch (err) {
        return err.message;
    }
});

// Add blog
export const addNewBlog = createAsyncThunk('blog/addNewBlog', async(newBlog) => {
    console.log('Adding new Blog...');
    try {
        const res = await axios.post(`${baseRoute}/add`, newBlog);
        console.log(res.data);
        return res.data;
    } catch (err) {
        return err.message;
    }
});

// Update blog
export const updateBlog = createAsyncThunk('blog/updateBlog', async(blog) => {
    console.log(`Update blog id is ${blog.blogId}`);
    const id = blog.blogId;
    try {
        const res = await axios.put(`${baseRoute}/edit/${id}`, blog);
        console.log(res.data);
        return res.data;
    } catch (err) {
        return err.message;
    }
});

// Delete blog
export const removeBlog = createAsyncThunk('blog/removeBlog', async(id) => {
    console.log(`Delete Blog id is ${id}`);
    try {
        const res = await axios.delete(`${baseRoute}/delete/${id}`);
        if(res.status === 200) return id;
        return `${res.status}: ${res.statusText}`;
    } catch (err) {
        return err.message;
    }
});

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
            .addCase(addNewBlog.fulfilled, (state, action) => {
                state.blog = action.payload;
                state.blogList.push(action.payload);
            })
            .addCase(updateBlog.fulfilled, (state, action) => {
                if(!action.payload){
                    console.log('Update could not complete');
                    return;
                }

                const { blogId } = action.payload;
                const newBloglist = state.blogList.filter(item => item.blogId !== blogId);
                state.blogList = [...newBloglist, action.payload];
                state.blog = action.payload;
            })
            .addCase(removeBlog.fulfilled, (state, action) => {
                if(!action.payload){
                    console.log('Delete could complete');
                    console.log(action.payload);
                    return;
                }

                const blogId = action.payload;
                const newBloglist = state.blogList.filter(item => item.blogId !== blogId);
                state.blogList = newBloglist;
            })
    }
})

export const selectAllBlogs = (state) => state.blog.blogList;
export const getBlogStatus = (state) => state.blog.status;
export const getBlogError = (state) => state.blog.error;
export const selectBlogByID = (state, id) => state.blog.blogList.find(item => item.blogId === +id);

export default blogSlice.reducer;