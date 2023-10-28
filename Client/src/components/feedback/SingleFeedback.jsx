import React from 'react';
import { Link } from 'react-router-dom';
import { FaPen, FaTrashCan } from 'react-icons/fa6';


const SingleFeedback = (props) => {
  const { feedId, feedbackBody, feedbackTitle } = props.feedback;

  const feedbackOnDelete = (id) => {
    console.log('Deleted Clicked!');
    console.log(`Id: ${id}`);

  };
  
  return (
    <div className="card shadow col-md-5">
        <img src="#" alt="Picture" className="card-img-top"/>
        <div className="card-body">
            <h5 className="card-title">{feedbackTitle}</h5>
            <p className="card-text">{feedbackBody}</p>
            <Link className="btn main-bg-color btn-color me-3 fw-semibold text-light" to={`./edit/${feedId}`}>
              <FaPen className="me-2 mb-1"/>Edit
            </Link>
            <Link className="btn btn-danger ms-3 fw-semibold" onClick={() => {feedbackOnDelete(feedId)}}>
              <FaTrashCan className="me-2 mb-1"/>Delete
            </Link>
        </div>
    </div>
  )
}

export default SingleFeedback