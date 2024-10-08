import { Fragment, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaPen, FaTrashCan } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { removeBlog } from '../../reducer/blogSlice';
import { getIsAuth, getIsStaff, getAuthUserID, getUserEmailVerify } from '../../reducer/authSlice';
import { storage } from '../../utils/firebase';
import { ref, deleteObject } from 'firebase/storage';
import Spinner from '../layout/Spinner';

const SingleBlog = ({ blog, user }) => {
  const dispatch = useDispatch();
  const pathLocation = useLocation().pathname;
  const homePath = pathLocation === '/';
  const isAuth = useSelector(getIsAuth);
  const isVerified = useSelector(getUserEmailVerify);
  const authIsStaff = useSelector(getIsStaff);
  const staffRole = isAuth && authIsStaff;
  const { blogId , blogHeader, blogTitle, blogBody, blogImage } = blog;
  const [{ userId, username, isStaff }] = user.length !== 0 ? user : [{}];
  const authUserID = useSelector(getAuthUserID);
  const sameAuthUser = userId === authUserID;
  const [pageIsLoading, setPageIsLoading] = useState(false);

  const blogOnDelete = async (id) => {
    console.log('Delete Clicked!');
    console.log(`ID: ${id}`);

    try {
        setPageIsLoading(true);
        // Delete the image otherwise continue
        if(blogImage != null){
            const imageRef = ref(storage, blogImage);
            await deleteObject(imageRef);
        }

        dispatch(removeBlog(id)).unwrap();
    } catch (err) {
        console.log('Failed to delete blog', err);
    } finally {
        setPageIsLoading(false);
    }
  };

    return(
        <section className="card shadow px-0 col-md-5">
            {pageIsLoading && (
                <Spinner loadingLabel="Deleting" />
            )}
            {blogImage && (
                <img src={blogImage} alt="Picture" className="card-img-top"/>
            )}
            <h2 className="card-header">
                {blogHeader}
            </h2>
            <div className="card-body">
                <h5 className="card-title">
                    {blogTitle}
                </h5>
                <p className="card-text">
                    {blogBody}
                </p>
                {((staffRole || sameAuthUser) && (isAuth && isVerified)) && (
                    <Fragment>
                        {(!staffRole || sameAuthUser) && (
                            <Link className="btn main-bg-color btn-color me-3 fw-semibold text-light" to={`${homePath ? `blog/edit/${blogId}` : `./edit/${blogId}`}`}>
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