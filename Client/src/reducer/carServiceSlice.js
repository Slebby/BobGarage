import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    carServices: [],
    oneCarService: {},
    status: 'idle',
    error: null
};

// Fetch all Car Services
export const fetchCarServiceList = createAsyncThunk('carService/fetchCarServiceList' , async() => {
    console.log('Getting All Car Services...');
    try {
        const res = await axios.get('/api/service');
        console.log(res.data);
        return res.data;
    } catch (err) {
        return err.message;
    }
})

// Add Car Service

// Update Car Service

// Delete Car Service

const carServiceSlice = createSlice({
    name: 'carService',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchCarServiceList.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchCarServiceList.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.carServices = action.payload;
            })
            .addCase(fetchCarServiceList.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
    }
})

export const selectAllCarServices = (state) => state.car_Service.carServices;
export const getCarServiceStatus = (state) => state.car_Service.status;
export const getCarServiceError = (state) => state.car_Service.error;

export default carServiceSlice.reducer;