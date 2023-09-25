import React from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../../context/context';
import axios from 'axios';

const SingleFeedback = (props) => {
  const { feedId, feedbackBody, feedbackTitle } = props.feedback;

  const feedbackOnDelete = (id, dispatch) => {
    console.log('Deleted Clicked!');
    console.log(`Id: ${id}`);

    axios.delete(`/api/feedback/delete/${id}`);
    dispatch({ type: 'DELETE_FEEDBACK', payload: id});
  };
  
  return (
    <Consumer>
        { value => { const { dispatch } = value;
            return (
                <div className="card shadow col-md-5">
                    <img src="#" alt="Picture" className="card-img-top"/>
                    <div className="card-body">
                        <h5 className="card-title">{feedbackTitle}</h5>
                        <p className="card-text">{feedbackBody}</p>
                        <Link className="btn main-bg-color btn-color me-3 fw-semibold text-light" to={`./edit/${feedId}`}>Edit</Link>
                        <Link className="btn btn-danger ms-3 fw-semibold" onClick={() => {feedbackOnDelete(feedId, dispatch)}}>Delete</Link>
                    </div>
                </div>
            )
        }}
    </Consumer>
  )
}

export default SingleFeedback