import React from 'react';
import SingleFeedback from './SingleFeedback';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import { Consumer } from '../../context/context';

const Feedback = (props) => {

    return (
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
                    feedbackList.map( feedback => (
                        <SingleFeedback key={feedback.feedId} feedback={feedback} />
                    ))
                }
            </div>
        </div>
    </main>
    )
}

export default Feedback