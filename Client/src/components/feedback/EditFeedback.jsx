import { useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FaAnglesLeft } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { updateFeedback, selectFeedbackByID } from '../../reducer/feedbackSlice';

const EditFeedback = () => {
  const dispatch = useDispatch();
  
  const { id } = useParams();
  //   console.log(id);
  
  const navigate = useNavigate();
  const feedback = useSelector((state) => selectFeedbackByID(state, id));

  if(!feedback){
    return(
      <section>
        <h2>Feedback not found!!!</h2>
      </section>
    )
  }
  
  const [formData, setFormData] = useState({
    feedbackTitle: feedback.feedbackTitle,
    feedbackBody: feedback.feedbackBody,
    UserUserId: feedback.UserUserId,
    errors: {}
  });

  const [requestStatus, setRequestStatus] = useState('idle');

  const { feedbackTitle, feedbackBody, UserUserId, errors } = formData;

  const canSave = feedbackTitle !== undefined && feedbackBody !== undefined && requestStatus === 'idle';

  const feedbackOnChange = (e) => {
    // console.log(e);

    setFormData({
        ...formData, [e.target.name]: e.target.value
    });
  };

  const feedbackOnSubmit = async (e) => {
    e.preventDefault();

    console.log('Edit feedback - Submitting Form...');

    const updFeedback = {
      feedId: parseInt(id),
      feedbackTitle,
      feedbackBody
    };

    console.log(updFeedback);

    try {
      if(canSave){
        console.log('Can save... Updating');
        setRequestStatus('pending');
        dispatch(updateFeedback(updFeedback)).unwrap();
      } else {
        console.log('Cannot save changes');
        return;
      }
    } catch (err) {
      console.log('Failed to save feedback', err);
    } finally {
      setRequestStatus('idle');
    }
    navigate('/feedback');
  };
  
  return (
  <div className="container mb-5">
      <h3 className="text-center m-4 fw-semibold">Edit Feedback</h3>
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
                  <button type="submit" value="Post Feedback" className="btn btn-lg main-bg-color w-100 btn-color text-light mt-3">Edit</button>
              </div>
          </form>
      </section>
  </div>
  )
}

export default EditFeedback