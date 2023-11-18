import { Fragment, useState } from 'react';
import { Link, useNavigate, useParams, Navigate } from 'react-router-dom';
import { FaAnglesLeft } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { updateBlog, selectBlogByID } from '../../reducer/blogSlice';
import { getIsAuth } from '../../reducer/authSlice';

const EditBlog = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuth = useSelector(getIsAuth);
  
    if(!isAuth){
      return <Navigate to='/blog' />
    }

    const { id } = useParams();
    // console.log(id);

    const blog = useSelector((state) => selectBlogByID(state, id));
    // console.log(blog);
    if(!blog){
        return (
            <Fragment>
                <h2>Blog not found!</h2>
            </Fragment>
        )
    }

    

    const [formData, setFormData] = useState({
      blogHeader: blog.blogHeader,
      blogTitle: blog.blogTitle,
      blogBody: blog.blogBody,
      myUserBlogId: blog.myUserBlogId,
      errors: {}
    });

    
    const [requestStatus, setRequestStatus] = useState('idle');
    
    const { blogHeader, blogTitle, blogBody, myUserBlogId, errors } = formData;
    
    const canSave = blogHeader !== undefined && blogTitle !== undefined && blogBody !== undefined && requestStatus === 'idle';
    
    const blogOnChange = e => {
      // console.log(e);
      
      setFormData({
        ...formData, [e.target.name]: e.target.value
      });
    };
    
    const errorHandling = () => {
        console.log('Checking for error...');
    
        const newErrors = {};
    
        if(blogHeader === "") {
          console.log('Header is empty');
          newErrors.headerErr = "Header is empty";
        }
        if(blogTitle === ""){
          console.log('Title is empty');
          newErrors.titleErr = "Title is empty";
        }
        if(blogBody === ""){
          console.log('Body is empty');
          newErrors.bodyErr = "Body is empty";
        }
    
        console.log('Checking Error Done');
    
        if(Object.keys(newErrors).length === 0){
          console.log("No Errors");
          setFormData({
            ...formData,
            errors: {}
          });
    
          return false;
        } else {
          setFormData({
            ...formData,
            errors: {...newErrors}
          })
          return true;
        }
      };
      
    const blogOnSubmit = async (e) => {
      e.preventDefault();
  
      console.log('Edit Blog - Submitting Form...');

      if(!errorHandling()){
          const updBlog = {
            blogId: id,
            blogHeader,
            blogTitle,
            blogBody,
            myUserBlogId
          }
      
          console.log(updBlog);
          try {
            if(canSave) {
                console.log('Can save... updating');
                setRequestStatus('pending');
                dispatch(updateBlog(updBlog));
            } else {
                console.log('Cannot Save...');
                return;
            }
          } catch (err) {
            console.log('Failed to save blog', err);
          } finally {
            setRequestStatus('idle');
          }
          navigate('/blog');
      }

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
                            <input type="text" name="blogHeader" placeholder="Header Text Here" id="floatingHeader" className={`form-control ${errors.headerErr && !blogHeader ? 'is-invalid' : ''}`}
                            onChange={e => blogOnChange(e)}
                            value={blogHeader} />
                            <label htmlFor="floatingHeader" className="opacity-75">Header</label>
                            {errors.headerErr && !blogHeader && (
                                <div className="badge form-text bg-danger fs-6">{errors.headerErr}</div>
                            )}
                        </div>
                    </header>
                    
                    <div className="card-body">
                        <div className="card-title">
                            <div className="form-floating">
                                <input type="text" name="blogTitle" id="floatingTitle" placeholder="Title Text Here" className={`form-control ${errors.titleErr && !blogTitle ? 'is-invalid' : ''}`}
                                onChange={e => blogOnChange(e)}
                                value={blogTitle} />
                                <label htmlFor="floatingTitle" className="opacity-75">Title</label>
                                {errors.titleErr && !blogTitle && (
                                    <div className="badge form-text bg-danger fs-6">{errors.titleErr}</div>
                                )}
                            </div>
                        </div>
                        <div className="card-text">
                            <div className="form-floating">
                                <textarea type="text" name="blogBody" id="floatingText" placeholder="Body Text Here" className={`form-control ${errors.bodyErr && !blogBody ? 'is-invalid' : ''}`} style={{height: "20rem"}}
                                onChange={e => blogOnChange(e)}
                                value={blogBody} />
                                <label htmlFor="floatingText" className="opacity-75">Body</label>
                                {errors.bodyErr && !blogBody && (
                                    <div className="badge form-text bg-danger fs-6">{errors.bodyErr}</div>
                                )}
                            </div>
                        </div>
                        <button type="submit" value="Post Feedback" className="btn btn-lg main-bg-color w-100 btn-color text-light mt-3">Edit</button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default EditBlog