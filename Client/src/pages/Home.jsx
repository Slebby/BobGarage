import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SingleCarService from '../components/carService/SingleCarService';
import SingleFeedback from '../components/feedback/SingleFeedback';
import SingleBlog from '../components/blog/SingleBlog';

const Home = props => {
    return (
        <main>
            <section className="secondary-bg-color">
                <p className="text-center py-5 fs-2 mb-0 fw-semibold">Welcome</p>
            </section>
            <section className="pb-5 border-bottom">
                <div className="container text-center">
                    <h3 className="m-4">
                        <Link to='/service' className="link-dark link-underline link-underline-opacity-0 link-opacity-75-hover fw-semibold">Check our Services</Link>
                    </h3>
                    <div className="row row-cols-2 gap-5 justify-content-center">
                        {
                            serviceList.map( service => (
                                <SingleCarService key={service.serviceId} carService={service}/>
                            ))
                        }
                    </div>
                </div>
            </section>
            <section className="pb-5 border-bottom">
                <div className="container text-center">
                    <h3 className="m-4">
                        <Link to="/blog" className="link-dark link-underline link-underline-opacity-0 link-opacity-75-hover fw-semibold">Blog from others</Link>
                    </h3>
                    <div className="row row-cols-2 gap-5 justify-content-center">
                        {
                            blogList.map( blog => (
                                <SingleBlog key={blog.blogId} blog={blog} />
                            ))
                        }
                    </div>
                </div>
            </section>
            <section className="pb-5">
                <div className="container text-center">
                    <h3 className="m-4">
                        <Link to="/feedback" className="link-dark link-underline link-underline-opacity-0 link-opacity-75-hover fw-semibold">Feedback from other users</Link>
                    </h3>
                    <div className="row row-cols-2 gap-5 justify-content-center">
                        {
                            feedbackList.map( feedback => (
                                <SingleFeedback key={feedback.feedId} feedback={feedback} />
                            ))
                        }
                    </div>
                </div>
            </section>
        </main>
    )
}

Home.propTypes = {}

export default Home