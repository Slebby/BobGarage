import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaPen, FaTrashCan } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { removeFeedback } from '../../reducer/feedbackSlice';

const SingleFeedback = ({ feedback }) => {
  const { feedId, feedbackBody, feedbackTitle } = feedback;
  const dispatch = useDispatch();

  const feedbackOnDelete = (id) => {
    console.log('Deleted Clicked!');
    console.log(`Id: ${id}`);

    try {
      dispatch(removeFeedback(id)).unwrap();
    } catch (err) {
      console.log('Failed to delete feedback', err);
    }
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

SingleFeedback.propTypes = {
  feedback: PropTypes.object,
  removeFeedback: PropTypes.func
}

export default SingleFeedback