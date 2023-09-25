import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FaAnglesLeft } from 'react-icons/fa6';
import { Consumer } from '../../context/context';

const EditFeedback = () => {
  const [formData, setFormData] = useState({
    feedId: '',
    feedbackTitle: '',
    feedbackBody: ''
  });

  const { id } = useParams();
//   console.log(id);
  const navigate = useNavigate();

  useEffect(() => {
    const getFeedback = async (feedId) => {
        const res = await axios.get(`/api/feedback/edit/${feedId}`);
        const item = res.data;

        console.log(item);
        setFormData({
            feedId: item.id,
            feedbackTitle: item.feedbackTitle,
            feedbackBody: item.feedbackBody
        });
    }

    getFeedback(id);
  }, [id]);

  const { feedbackTitle, feedbackBody } = formData;

  const feedbackOnChange = (e) => {
    // console.log(e);

    setFormData({
        ...formData, [e.target.name]: e.target.value
    });
  };

  const feedbackOnSubmit = async (e, dispatch) => {
    e.preventDefault();

    console.log('Edit feedback - Submitting Form...');

    const updFeedback = {
      feedId: id,
      feedbackTitle,
      feedbackBody
    };

    console.log(updFeedback);

    const res = await axios.put(`/api/feedback/edit/${id}`, updFeedback);

    // console.log(res.data);
    dispatch({ type: 'UPDATE_FEEDBACK', payload: res.data });
    navigate('/feedback');
  };
  
  return (
    <Consumer>
        { value => { const { dispatch } = value 
            return (
            <div className="container mb-5">
                <h3 className="text-center m-4 fw-semibold">Edit Feedback</h3>
                <p>
                    <Link className="link-dark link-underline link-underline-opacity-0 link-opacity-75-hover" to="/feedback">
                        <FaAnglesLeft className="mb-1 me-1"/>Back
                    </Link>
                </p>
                <section className="card secondary-bg-color border-0">
                    <form onSubmit={e => feedbackOnSubmit(e, dispatch)}>
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
        }}
    </Consumer>
  )
}

export default EditFeedback