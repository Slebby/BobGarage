import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaAnglesLeft } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { addNewBlog } from '../../reducer/blogSlice';
import { getAuthUserID } from '../../reducer/authSlice';

const AddBlog = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userId = useSelector(getAuthUserID);
  const [formData, setFormData] = useState({
    blogHeader: '',
    blogTitle: '',
    blogBody: '',
    myUserBlogId: userId,
    errors: {}
  });

  const { blogHeader, blogTitle, blogBody, myUserBlogId, errors } = formData;

  const blogOnChange = e => {
    // console.log(e);

    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  };

  const blogOnSubmit = async (e) => {
    e.preventDefault();

    console.log('Add Blog - Submitting Form...');

    const newBlog = {
      blogHeader,
      blogTitle,
      blogBody,
      myUserBlogId
    }

    console.log(newBlog);
    dispatch(addNewBlog(newBlog));
    navigate('/blog');
  };
  
  return (
    <div className="container mb-5">
        <h3 className="text-center m-4 fw-semibold">Post Blog</h3>
        <p>
            <Link className="link-dark link-underline link-underline-opacity-0 link-opacity-75-hover" to="/blog">
                <FaAnglesLeft className="mb-1 me-1"/>Back
            </Link>
        </p>
        <section className="card shadow secondary-bg-color border-0">
            <form onSubmit={e => blogOnSubmit(e)}>
                <header className="card-header header-bg-color border-bottom-0">
                    <div className="form-floating">
                        <input type="text" name="blogHeader" placeholder="Header Text Here" id="floatingHeader" className="form-control"
                        onChange={e => blogOnChange(e)}
                        value={blogHeader} />
                        <label htmlFor="floatingHeader" className="opacity-75">Header</label>
                    </div>
                </header>
                
                <div className="card-body">
                    <div className="card-title">
                        <div className="form-floating">
                            <input type="text" name="blogTitle" id="floatingTitle" placeholder="Title Text Here" className="form-control"
                            onChange={e => blogOnChange(e)}
                            value={blogTitle} />
                            <label htmlFor="floatingTitle" className="opacity-75">Title</label>
                        </div>
                    </div>
                    <div className="card-text">
                        <div className="form-floating">
                            <textarea type="text" name="blogBody" id="floatingText" placeholder="Body Text Here" className="form-control" style={{height: "20rem"}}
                            onChange={e => blogOnChange(e)}
                            value={blogBody} />
                            <label htmlFor="floatingText" className="opacity-75">Body</label>
                        </div>
                    </div>
                    <button type="submit" value="Post Feedback" className="btn btn-lg main-bg-color w-100 btn-color text-light mt-3">Post</button>
                </div>
            </form>
        </section>
    </div>
  )

}

export default AddBlog