import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { FaAnglesLeft } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { addNewFeedback } from '../../reducer/feedbackSlice';
import { getAuthUserID, getIsAuth, getUserEmailVerify } from '../../reducer/authSlice';
import { storage } from '../../utils/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import Spinner from '../layout/Spinner';

const AddFeedback = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);
  const isVerified = useSelector(getUserEmailVerify);

  if(!isAuth){
    return <Navigate to='/feedback' />
  } else if(isAuth && !isVerified){
    return <Navigate to='/email/verify' />
  }

  const userId = useSelector(getAuthUserID);
  console.log(userId);
  const [formData, setFormData] = useState({
    feedbackTitle: '',
    feedbackBody: '',
    myUserFeedbackId: userId,
    errors: {}
  });
  const [pageIsLoading, setPageIsLoading] = useState(false);
  
  const { feedbackTitle, feedbackBody, myUserFeedbackId, errors } = formData;
  
  const feedbackOnChange = (e) => {
    // console.log(e);
    
    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  };

  // Image handling
  const [imageUpload, setImageUpload] = useState(null);

  const handleImageChange = e => {
    setImageUpload(e.target.files[0]);
  };
  
  const uploadImageThenReturnURL = async() => {
    console.log(imageUpload);
    try {
      if(imageUpload != null){
        const imageRef = ref(storage, `feedbackImages/${userId}/${v4() + '_' + imageUpload.name}`);
    
        await uploadBytes(imageRef, imageUpload);
        const getImageURL = await getDownloadURL(imageRef);
  
        console.log(getImageURL);
  
        return getImageURL;
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const errorHandling = () => {
    console.log('Checking for error...');

    const newErrors = {};

    if(feedbackTitle === ""){
      console.log('Title is empty');
      newErrors.titleErr = "Title is empty";
    }
    if(feedbackBody === ""){
      console.log('Body is empty');
      newErrors.bodyErr = "Body is empty";
    }

    console.log('Checking Error Done');

    if(Object.keys(newErrors).length === 0){
      console.log("No Errors");
      setFormData({
        ...formData,
        errors: {}
      });

      return false;
    } else {
      setFormData({
        ...formData,
        errors: {...newErrors}
      })
      return true;
    }
  };

  const feedbackOnSubmit = async (e) => {
    e.preventDefault();
    console.log('Add feedback - Submitting Form...');
    
    if(!errorHandling()){
      setPageIsLoading(true);
      const feedbackImage = await uploadImageThenReturnURL() || null;

      const newFeedback = {
        feedbackTitle,
        feedbackBody,
        feedbackImage,
        myUserFeedbackId
      };
  
      console.log(newFeedback);
  
      dispatch(addNewFeedback(newFeedback));
      navigate('/feedback');

    }
  };

    return (
    <div className="container mb-5">
      {pageIsLoading && (
        <Spinner loadingLabel="Submitting" />
      )}
        <h3 className="text-center m-4 fw-semibold">Add Feedback</h3>
        <p>
            <Link className="link-dark link-underline link-underline-opacity-0 link-opacity-75-hover" to="/feedback">
                <FaAnglesLeft className="mb-1 me-1"/>Back
            </Link>
        </p>
        <section className="card shadow secondary-bg-color border-0">
            <form onSubmit={e => feedbackOnSubmit(e)}>
              <div className="p-3 header-bg-color rounded-top">
                <label htmlFor="imageUpload" className="form-label fw-semibold">Upload Image Here</label>
                <input type="file" name="imageUpload" id="imageUpload" onChange={e => handleImageChange(e)} className="form-control"/>
              </div>
                <div className="card-body">
                    <div className="card-title">
                        <div className="form-floating">
                            <input type="text" name="feedbackTitle" id="floatingTitle" placeholder="Title Text Here" className={`form-control ${errors.titleErr && !feedbackTitle ? 'is-invalid' : ''}`} value={feedbackTitle}
                            onChange={e => feedbackOnChange(e)} />
                            <label htmlFor="floatingTitle" className="opacity-75">Title</label>
                            {errors.titleErr && !feedbackTitle && (
                              <div className="badge form-text bg-danger fs-6">{errors.titleErr}</div>
                            )}
                        </div>
                    </div>
                    <div className="card-text">
                        <div className="form-floating">
                            <textarea
                            type="text"
                            name="feedbackBody"
                            id="floatingText"
                            placeholder="Body Text Here"
                            className={`form-control ${errors.bodyErr && !feedbackBody ? 'is-invalid' : ''}`}
                            style={{height: "20rem"}} value={feedbackBody}
                            onChange={e => feedbackOnChange(e)} />
                            <label htmlFor="floatingText" className="opacity-75">Body</label>
                            {errors.bodyErr && !feedbackBody && (
                              <div className="badge form-text bg-danger fs-6">{errors.bodyErr}</div>
                            )}
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