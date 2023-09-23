import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();
const reducer = (state, action) => {
    switch(action.type){
        case "DELETE_FEEDBACK":
            return{
                ...state,
                feedbackList: state.feedbackList.filter(
                    item => item.feedbackId !== action.payload
                )
            };
        case "UPDATE_FEEDBACK":
            return{
                ...state,
                feedbackList: state.feedbackList.map(
                    item => item.feedbackId === action.payload.id ? (item = action.payload) : item
                )
            };
        case "ADD_FEEDBACK":
            return{
                ...state,
                feedbackList: [action.payload, ...state.feedbackList]
            };
        default:
            return state;
    }
}

export class Provider extends Component{
    async componentDidMount(){
        const res = await axios.get('https://jsonplaceholder.typicode.com/comments');
        // console.log(res.data);
        this.setState({ feedbackList: res.data });
    };

    state = {
        feedbackList: [],
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