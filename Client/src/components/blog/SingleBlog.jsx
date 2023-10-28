import React from 'react';
import { Link } from 'react-router-dom';
import { FaPen, FaTrashCan } from 'react-icons/fa6';


const SingleBlog = (props) => {
  const { blogId , blogHeader, blogTitle, blogBody } = props.blog;
  const blogOnDelete = (id) => {
    console.log('Delete Clicked!');
    console.log(`ID: ${id}`);

  };

    return(
        <div className="card shadow px-0 col-md-5">
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
                <Link className="btn main-bg-color btn-color me-3 fw-semibold text-light" to={`./edit/${blogId}`}>
                    <FaPen className="me-2 mb-1"/>Edit
                </Link>
                <Link className="btn btn-danger ms-3 fw-semibold" onClick={() => {blogOnDelete(blogId)}}>
                    <FaTrashCan className="me-2 mb-1"/>Delete
                </Link>
            </div>
        </div>
    )

}

export default SingleBlog