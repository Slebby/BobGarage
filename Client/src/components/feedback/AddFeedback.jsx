import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { FaAnglesLeft } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { addNewFeedback } from '../../reducer/feedbackSlice';
import { getAuthUserID, getIsAuth } from '../../reducer/authSlice';

const AddFeedback = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);
  
  if(!isAuth){
    return <Navigate to='/feedback' />
  }

  const userId = useSelector(getAuthUserID);
  console.log(userId);
  const [formData, setFormData] = useState({
    feedbackTitle: '',
    feedbackBody: '',
    myUserFeedbackId: userId,
    errors: {}
  });

  const { feedbackTitle, feedbackBody, myUserFeedbackId, errors } = formData;

  const feedbackOnChange = (e) => {
    // console.log(e);

    setFormData({
        ...formData, [e.target.name]: e.target.value
    });
  };

  const feedbackOnSubmit = async (e) => {
    e.preventDefault();

    console.log('Add feedback - Submitting Form...');

    const newFeedback = {
      feedbackTitle,
      feedbackBody,
      myUserFeedbackId
    };

    console.log(newFeedback);

    dispatch(addNewFeedback(newFeedback));
    navigate('/feedback');
  };

    return (
    <div className="container mb-5">
        <h3 className="text-center m-4 fw-semibold">Add Feedback</h3>
        <p>
            <Link className="link-dark link-underline link-underline-opacity-0 link-opacity-75-hover" to="/feedback">
                <FaAnglesLeft className="mb-1 me-1"/>Back
            </Link>
        </p>
        <section className="card shadow secondary-bg-color border-0">
            <form onSubmit={e => feedbackOnSubmit(e)}>
                <div className="card-body">
                    <div className="card-title">
                        <div className="form-floating">
                            <input type="text" name="feedbackTitle" id="floatingTitle" placeholder="Title Text Here" className="form-control" value={feedbackTitle}
                            onChange={e => feedbackOnChange(e)} />
                            <label htmlFor="floatingTitle" className="opacity-75">Title</label>
                        </div>
                    </div>
                    <div className="card-text">
                        <div className="form-floating">
                            <textarea
                            type="text"
                            name="feedbackBody"
                            id="floatingText"
                            placeholder="Body Text Here"
                            className="form-control"
                            style={{height: "20rem"}} value={feedbackBody}
                            onChange={e => feedbackOnChange(e)} />
                            <label htmlFor="floatingText" className="opacity-75">Body</label>
                        </div>
                    </div>
                    <button type="submit" value="Post Feedback" className="btn btn-lg main-bg-color w-100 btn-color text-light mt-3">Submit</button>
                </div>
            </form>
        </section>
    </div>
    )
}

export default AddFeedback