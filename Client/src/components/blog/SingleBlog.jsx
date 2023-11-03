import React from 'react';
import { Link } from 'react-router-dom';
import { FaPen, FaTrashCan } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { removeBlog } from '../../reducer/blogSlice';


const SingleBlog = ({ blog }) => {
  const dispatch = useDispatch();
  const { blogId , blogHeader, blogTitle, blogBody } = blog;
  const blogOnDelete = (id) => {
    console.log('Delete Clicked!');
    console.log(`ID: ${id}`);

    try {
        dispatch(removeBlog(id)).unwrap();
    } catch (err) {
        console.log('Failed to delete feedback', err);
    }
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