import React from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../../context/context';
import axios from 'axios';

const SingleFeedback = (props) => {
  const { feedId, feedbackBody, feedbackTitle } = props.feedback;
  return (
    <Consumer>
        { value => { const { dispatch } = value;
            return (
                <div className="card col-md-5">
                    <img src="#" alt="Picture" className="card-img-top"/>
                    <div className="card-body">
                        <h5 className="card-title">{feedbackTitle}</h5>
                        <p className="card-text">{feedbackBody}</p>
                        <Link className="btn btn-secondary me-3" to={`/edit/${feedId}`}>Edit</Link>
                        <Link className="btn btn-danger ms-3">Delete</Link>
                    </div>
                </div>
            )
        }}
    </Consumer>
  )
}

export default SingleFeedback