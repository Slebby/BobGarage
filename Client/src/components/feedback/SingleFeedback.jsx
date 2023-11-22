import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaPen, FaTrashCan } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { removeFeedback } from '../../reducer/feedbackSlice';
import { getAuthUserID, getIsAuth, getIsStaff } from '../../reducer/authSlice';

const SingleFeedback = ({ feedback, user }) => {
  const { feedId, feedbackBody, feedbackTitle, feedbackImage } = feedback;
  const [{ userId, username, isStaff }] = user.length !== 0 ? user : [{}];
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);
  const authIsStaff = useSelector(getIsStaff);
  const authUserID = useSelector(getAuthUserID);
  const staffRole = isAuth && authIsStaff;
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
    <div className="card shadow px-0 col-md-5">
        {feedbackImage && (
          <img src={feedbackImage} alt="Picture" className="card-img-top"/>
        )}
        <div className="card-body">
            <h5 className="card-title">{feedbackTitle}</h5>
            <p className="card-text">{feedbackBody}</p>
            {((staffRole || sameAuthUser) && isAuth) && (
              <Fragment>
                {(!staffRole || sameAuthUser) && (
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
          {isStaff && (
            <span className="ms-1 text-primary fw-bold">{'(Admin)'}</span>
          )}
          
        </div>
    </div>
  )
}

SingleFeedback.propTypes = {
  feedback: PropTypes.object,
  removeFeedback: PropTypes.func
}

export default SingleFeedback