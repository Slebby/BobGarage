import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaAnglesLeft } from 'react-icons/fa6';
import { Consumer } from '../../context/context';
import axios from 'axios';

const AddBlog = (props) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    blogId: '',
    blogHeader: '',
    blogTitle: '',
    blogBody: '',
    errors: {}
  });

  const {blogId, blogHeader, blogTitle, blogBody} = formData;

  const blogOnChange = e => {
    // console.log(e);

    setFormData({
      ...formData, [e.target.name]: e.target.value
    });
  };

  const blogOnSubmit = async (e, dispatch) => {
    e.preventDefault();

    console.log('Add Blog - Submitting Form...');

    const newBlog = {
      blogId,
      blogHeader,
      blogTitle,
      blogBody,
    }

    console.log(newBlog);

    const res = await axios.post('/api/blog/add', newBlog);
    console.log(res.data);

    dispatch({ type: "ADD_BLOG", payload: res.data });
    navigate('/blog');
  };
  
  return(
    <Consumer>
      { value => { const {dispatch} = value 
        return (
          <div className="container mb-5">
              <h3 className="text-center m-4 fw-semibold">Post Blog</h3>
              <p>
                  <Link className="link-dark link-underline link-underline-opacity-0 link-opacity-75-hover" to="/blog">
                      <FaAnglesLeft className="mb-1 me-1"/>Back
                  </Link>
              </p>
              <section className="card secondary-bg-color border-0">
                  <form onSubmit={e => blogOnSubmit(e, dispatch)}>
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

      }}
    </Consumer>
  )
}

export default AddBlog