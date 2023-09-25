import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();
const reducer = (state, action) => {
    switch(action.type){
        // Feedback action
        case "DELETE_FEEDBACK":
            return{
                ...state,
                feedbackList: state.feedbackList.filter(
                    item => item.feedId !== action.payload
                )
            };
        case "UPDATE_FEEDBACK":
            return{
                ...state,
                feedbackList: state.feedbackList.map(
                    item => item.feedId === action.payload.feedId ? (item = action.payload) : item
                )
            };
        case "ADD_FEEDBACK":
            return{
                ...state,
                feedbackList: [action.payload, ...state.feedbackList]
            };
        // Blog action
        case "DELETE_BLOG":
            return{
                ...state,
                blogList: state.blogList.filter(
                    item => item.blogId !== action.payload
                )
            };
        case "UPDATE_BLOG":
            return{
                ...state,
                blogList: state.blogList.map(
                    item => item.blogId === action.payload.blogId ? (item = action.payload) : item
                )
            };
        case "ADD_BLOG":
            return{
                ...state,
                blogList: [action.payload, ...state.blogList]
            };
        // Car Service actions
        case "DELETE_SERVICE":
            return{
                ...state,
                serviceList: state.serviceList.filter(
                    item => item.serviceId !== action.payload
                )
            };
        case "UPDATE_SERVICE":
            return{
                ...state,
                serviceList: state.serviceList.map(
                    item => item.serviceId === action.payload.serviceId ? (item = action.payload) : item
                )
            }
        case "ADD_SERVICE":
            return{
                ...state,
                serviceList: [action.payload, ...state.serviceList]
            }
        default:
            return state;
    }
}

export class Provider extends Component{
    async componentDidMount(){
        const resFeedback = await axios.get('/api/feedback');
        const resBlog = await axios.get('/api/blog');
        const resService = await axios.get('/api/service');
        // console.log(res.data);
        this.setState({ feedbackList: resFeedback.data, blogList: resBlog.data, serviceList: resService.data });
    };

    state = {
        feedbackList: [],
        blogList: [],
        serviceList: [],
        dispatch: action => {
            this.setState(state => reducer(state, action));
        }
    }

    render(){
        return(
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer;