import { Fragment } from 'react';
import SingleFeedback from './SingleFeedback';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { selectAllFeedback, getFeedbackStatus, getFeedbackError } from '../../reducer/feedbackSlice';

const Feedback = (props) => {

    const feedbackList = useSelector(selectAllFeedback);
    const feedbackStatus = useSelector(getFeedbackStatus);
    const feedbackError = useSelector(getFeedbackError);

    console.log(feedbackList);

    let content;
    if (feedbackStatus === 'loading'){
        console.log('Loading...');
        content = <p>Loading...</p>
    } else if (feedbackStatus === 'succeeded'){
        console.log('Success!');
        content =
            <main className="mb-5">
                <div className="container text-center">
                    <h3 className="m-4 fw-semibold">Feedback List</h3>
                    <p className="text-start mx-4">
                        <Link className="link-dark link-underline link-underline-opacity-0 link-opacity-75-hover" to="./add">
                            <FaPlus className="mb-1 me-1"/>Add
                        </Link>
                    </p>
                    <div className="row row-cols-2 gap-5 justify-content-center">
                        {
                            feedbackList.map( item => (
                                <SingleFeedback key={item.feedId} feedback={item} />
                            ))
                        }
                    </div>
                </div>
            </main>
    } else if (feedbackStatus === 'failed'){
        console.log('Error');
        content = <p>{feedbackError}</p>
    }

    return (
        <Fragment>
            {content}
        </Fragment>
    )
}

export default Feedback