import React from 'react';
import { Link } from 'react-router-dom';
import { Consumer } from '../../context/context';
import axios from 'axios';

const SingleBlog = (props) => {
  const { blogId , blogHeader, blogTitle, blogBody } = props.blog;
  return (
    <Consumer>
        { value => { const { dispatch } = value
            return(
                <div className="card px-0 col-md-5">
                    <img src="#" alt="Picture" className="card-img-top"/>
                    <h2 className="card-header secondary-bg-color">
                        {blogHeader}
                    </h2>
                    <div className="card-body">
                        <h5 className="card-title">
                            {blogTitle}
                        </h5>
                        <p className="card-text">
                            {blogBody}
                        </p>
                        <Link className="btn main-bg-color btn-color me-3 fw-semibold text-light" to="/">Edit</Link>
                        <Link className="btn btn-danger ms-3 fw-semibold">Delete</Link>
                    </div>
                </div>
            )
        }}
    </Consumer>
  )
}

export default SingleBlog