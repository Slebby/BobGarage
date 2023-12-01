import { Fragment, useEffect, useState } from 'react';
import SingleFeedback from './SingleFeedback';
import { Link, useLocation } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { selectAllFeedback, getFeedbackStatus, getFeedbackError } from '../../reducer/feedbackSlice';
import { getIsAuth } from '../../reducer/authSlice';
import { selectAll_User } from '../../reducer/userSlice';
import Spinner from '../layout/Spinner';

const Feedback = (props) => {
    const pathLocation = useLocation().pathname;
    const feedbackList = useSelector(selectAllFeedback);
    const feedbackStatus = useSelector(getFeedbackStatus);
    const feedbackError = useSelector(getFeedbackError);
    const isAuth = useSelector(getIsAuth);
    console.log(feedbackList);
    const homePath = pathLocation === '/';
    const userNameLists = useSelector(selectAll_User);

    let feedbacks = [...feedbackList];
    const [sortOption, setSortOption] = useState("relevance");
    
    if(sortOption === "oldest") {
        feedbacks.sort((a, b) => {
            let dateA = new Date(a.createdAt),
            dateB = new Date(b.createdAt);
            return dateB - dateA;
        });
    } else if(sortOption === "newest") {
        feedbacks.sort((a, b) => {
            let dateA = new Date(a.createdAt),
            dateB = new Date(b.createdAt);
            return dateA - dateB;
        });
    } else if(sortOption === "relevance") {
        feedbacks = feedbackList;
    }

    console.log(feedbacks);
    
    let content;
    if (feedbackStatus === 'loading'){
        console.log('Loading...');
        content = <Spinner loadingLabel="Loading" />
    } else if (feedbackStatus === 'succeeded'){
        console.log('Success!');
        content =
            <section className="mb-5">
                <div className="container text-center">
                    <h3 className="m-4 fw-semibold">
                        {homePath ? (
                            <Link to="/feedback" className="link-dark link-underline link-underline-opacity-0 link-opacity-75-hover fw-semibold">
                                Feedback from other users
                            </Link>
                        ) : 'Feedback'}
                    </h3>
                    {homePath ? ''
                    : (isAuth) ? (
                        <div className="text-start m-4">
                            <span>
                                <Link className="link-dark link-underline link-underline-opacity-0 link-opacity-75-hover" to="./add">
                                    <FaPlus className="mb-1 me-1"/>Add
                                </Link>
                            </span>
                            <div className="dropdown float-end">
                                <button className="btn main-bg-color btn-color text-light dropdown-toggle text-capitalize" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Sort By {sortOption}
                                </button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" onClick={e => setSortOption("relevance")}>Relevance</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" onClick={e => setSortOption("newest")}>Newest</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" onClick={e => setSortOption("oldest")}>Oldest</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : null}

                    <div className="row row-cols-2 gap-5 justify-content-center">
                        {
                            feedbacks.map( item => {
                                console.log(item.myUserFeedbackId);
                                let user = userNameLists.filter( u => u.userId === item.myUserFeedbackId);
                                return <SingleFeedback key={item.feedId} feedback={item} user={user}/>
                            })
                        }
                    </div>
                </div>
            </section>
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