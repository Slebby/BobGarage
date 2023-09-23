import React from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../../context/context';
import axios from 'axios';

const SingleFeedback = (props) => {
  const { id, body, name } = props.feedback;
  return (
    <Consumer>
        { value => { const { dispatch } = value;
            return (
                <div className="card col-md-5">
                    <img src="#" alt="Picture" className="card-img-top"/>
                    <div className="card-body">
                        <h5 className="card-title">{name}</h5>
                        <p className="card-text">{body}</p>
                        <Link className="btn btn-secondary" to="/">Explore</Link>
                    </div>
                </div>
            )
        }}
    </Consumer>
  )
}

export default SingleFeedback