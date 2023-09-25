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
                    item => item.blogId === action.payload.id ? (item = action.payload) : item
                )
            };
        case "ADD_BLOG":
            return{
                ...state,
                blogList: [action.payload, ...state.blogList]
            };
        default:
            return state;
    }
}

export class Provider extends Component{
    async componentDidMount(){
        const resFeedback = await axios.get('/api/feedback');
        const resBlog = await axios.get('/api/blog');
        // console.log(res.data);
        this.setState({ feedbackList: resFeedback.data, blogList: resBlog.data });
    };

    state = {
        feedbackList: [],
        blogList: [],
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