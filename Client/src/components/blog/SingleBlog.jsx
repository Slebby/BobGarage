import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { FaPen, FaTrashCan } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { removeBlog } from '../../reducer/blogSlice';
import { getIsAuth, getIsStaff, getAuthUserID } from '../../reducer/authSlice';

const SingleBlog = ({ blog, user }) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);
  const authIsStaff = useSelector(getIsStaff);
  const staffRole = isAuth && authIsStaff;
  const { blogId , blogHeader, blogTitle, blogBody } = blog;
  const [{ userId, username, isStaff }] = user.length !== 0 ? user : [{}];
  const authUserID = useSelector(getAuthUserID);
  const sameAuthUser = userId === authUserID;

  const blogOnDelete = (id) => {
    console.log('Delete Clicked!');
    console.log(`ID: ${id}`);

    try {
        dispatch(removeBlog(id)).unwrap();
    } catch (err) {
        console.log('Failed to delete blog', err);
    }
  };

    return(
        <section className="card shadow px-0 col-md-5">
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
                {((staffRole || sameAuthUser) && isAuth) && (
                    <Fragment>
                        {!staffRole && (
                            <Link className="btn main-bg-color btn-color me-3 fw-semibold text-light" to={`./edit/${blogId}`}>
                                <FaPen className="me-2 mb-1"/>Edit
                            </Link>
                        )}
                        <Link className="btn btn-danger ms-3 fw-semibold" onClick={() => {blogOnDelete(blogId)}}>
                            <FaTrashCan className="me-2 mb-1"/>Delete
                        </Link>
                    </Fragment>
                )}
            </div>
            <div className="card-footer fs-5 fw-semibold">
                <span className="fw-normal fs-6 d-block">Posted by</span>
                <span className={!username ? 'text-danger fw-bold' : ''}>{username || 'Deleted User'}</span>
                {isStaff && (
                    <span className="ms-1 text-primary fw-bold">{'(Admin)'}</span>
                )}
            </div>
        </section>
    )

}

export default SingleBlog