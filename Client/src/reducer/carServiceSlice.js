import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseRoute = '/api/service';

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
        const res = await axios.get(baseRoute);
        console.log(res.data);
        return res.data;
    } catch (err) {
        return err.message;
    }
})

// Add Car Service
export const addNewCarService = createAsyncThunk('carService/addNewCarService', async(newService) => {
    console.log('Add new Service...');
    try {
        const res = await axios.post(`${baseRoute}/add`, newService);
        console.log(res.data);
        return res.data;
    } catch (err) {
        return err.message;
    }
})

// Update Car Service
export const updateCarService = createAsyncThunk('carService/updateCarService', async(editService) => {
    console.log(`Update Car Service id is ${editService.serviceId}`);
    const id = editService.serviceId;
    try {
        const res = await axios.put(`${baseRoute}/edit/${id}`, editService);
        console.log(res.data);
        return res.data;
    } catch (err) {
        return err.message;
    }
})

// Delete Car Service
export const removeCarService = createAsyncThunk('carService/removeCarService', async(id) => {
    console.log(`Delete Car Service id is ${id}`);
    try {
        const res = await axios.delete(`${baseRoute}/delete/${id}`);
        if(res.status === 200) return id;
        return `${res.status}: ${res.statusText}`;
    } catch (err) {
        return err.message;
    }
})

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
            .addCase(addNewCarService.fulfilled, (state, action) => {
                state.oneCarService = action.payload;
                state.carServices.push(action.payload);
            })
            .addCase(updateCarService.fulfilled, (state, action) => {
                if(!action.payload){
                    console.log('Update could not completed');
                    return;
                }

                const { serviceId } = action.payload;
                const newServiceList = state.carServices.filter(item => item.serviceId !== serviceId);
                state.carServices = [...newServiceList, action.payload];
                state.oneCarService = action.payload;
            })
            .addCase(removeCarService.fulfilled, (state, action) => {
                if(!action.payload){
                    console.log('Delete could not completed');
                    console.log(action.payload);
                    return;
                }

                const serviceId = action.payload;
                const newServiceList = state.carServices.filter(item => item.serviceId !== serviceId);
                state.carServices = newServiceList;
            })
    }
})

export const selectAllCarServices = (state) => state.car_Service.carServices;
export const getCarServiceStatus = (state) => state.car_Service.status;
export const getCarServiceError = (state) => state.car_Service.error;
export const selectCarServiceByID = (state, id) => state.car_Service.carServices.find(item => item.serviceId === +id);

export default carServiceSlice.reducer;