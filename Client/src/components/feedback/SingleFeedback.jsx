import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaPen, FaTrashCan } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { removeFeedback } from '../../reducer/feedbackSlice';
import { getAuthUserID, getIsAuth, getIsStaff } from '../../reducer/authSlice';

const SingleFeedback = ({ feedback, user }) => {
  const { feedId, feedbackBody, feedbackTitle } = feedback;
  const [{ userId, username }] = user.length !== 0 ? user : [{}];
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);
  const isStaff = useSelector(getIsStaff);
  const authUserID = useSelector(getAuthUserID);
  const staffRole = isAuth && isStaff;
  const sameAuthUser = userId === authUserID;

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
        <div className="card-body">
            <h5 className="card-title">{feedbackTitle}</h5>
            <p className="card-text">{feedbackBody}</p>
            {(staffRole || sameAuthUser) && (
              <Fragment>
                {(!staffRole) && (
                  <Link className="btn main-bg-color btn-color me-3 fw-semibold text-light" to={`./edit/${feedId}`}>
                    <FaPen className="me-2 mb-1"/>Edit
                  </Link>
                )}
                <Link className="btn btn-danger ms-3 fw-semibold" onClick={() => {feedbackOnDelete(feedId)}}>
                  <FaTrashCan className="me-2 mb-1"/>Delete
                </Link>
              </Fragment>
            )}
        </div>
        <div className="card-footer fs-5 fw-semibold">
          <span className={!username ? 'text-danger fw-bold': ''}>- {username || 'Deleted User'}</span>
        </div>
    </div>
  )
}

SingleFeedback.propTypes = {
  feedback: PropTypes.object,
  removeFeedback: PropTypes.func
}

export default SingleFeedback