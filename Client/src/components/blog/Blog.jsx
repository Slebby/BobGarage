import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';

const Blog = props => {
  return (
    <main>
        <div className="container text-center">
            <h3 className="m-4">Blogs</h3>
            <p className="text-start mx-4">
                <Link className="link-dark link-underline link-underline-opacity-0 link-opacity-75-hover" to="./add">
                    <FaPlus className="mb-1 me-1"/>Add
                </Link>
            </p>
            <div className="row row-cols-2 gap-5 justify-content-center">
                <div className="card col-md-5">
                    <img src="#" alt="Picture" className="card-img-top"/>
                    <div className="card-body">
                        <h5 className="card-title">Mechanical Repairs and Maintenance</h5>
                        <p className="card-text">Bob's team can handle everything from routine oil changes and brake inspections to complex engine repairs. They ensure that your vehicle runs smoothly and efficiently.</p>
                        <Link className="btn btn-secondary" to="/">Explore</Link>
                    </div>
                </div>
                <div className="card col-md-5">
                    <img src="#" alt="Picture" className="card-img-top"/>
                    <div className="card-body">
                        <h5 className="card-title">Tire Services</h5>
                        <p className="card-text">From tire rotations and balancing to tire replacements, Bob's team ensures that your vehicle's tires are in top condition, maximizing safety and performance.</p>
                        <Link className="btn btn-secondary" to="/">Explore</Link>
                    </div>
                </div>

            </div>
        </div>
    </main>
  )
}

Blog.propTypes = {}

export default Blog