import React from 'react';
import PropTypes from 'prop-types';
import CarService from '../components/carService/CarService';
import Blog from '../components/blog/Blog';
import Feedback from '../components/feedback/Feedback';

const Home = props => {
    return (
        <main>
            <section className="secondary-bg-color">
                <p className="text-center py-5 fs-2 mb-0 fw-semibold">Welcome</p>
            </section>
            <CarService />
            <Blog />
            <Feedback />
        </main>
    )
}

Home.propTypes = {}

export default Home