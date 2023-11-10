import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom';
import { FaMicroblog } from 'react-icons/fa6';
import SingleBlog from './SingleBlog';
import { useSelector } from 'react-redux';
import { selectAllBlogs, getBlogError, getBlogStatus } from '../../reducer/blogSlice';
import { getIsAuth } from '../../reducer/authSlice';
import { selectAll_User } from '../../reducer/userSlice';

const Blog = props => {
    const pathLocation = useLocation().pathname;
    const blogList = useSelector(selectAllBlogs);
    const blogStatus = useSelector(getBlogStatus);
    const blogError = useSelector(getBlogError);
    const isAuth = useSelector(getIsAuth);
    console.log(blogList);
    const userNameLists = useSelector(selectAll_User);

    const homePath = pathLocation === '/';

    let content;
    if(blogStatus === 'loading'){
        console.log('loading...');
        content = <p>Loading...</p>
    } else if (blogStatus === 'succeeded'){
        console.log('Success!');
        content =
            <section className="mb-5">
                <div className="container text-center">
                    <h3 className="m-4 fw-semibold">
                        {homePath ? (
                            <Link to="/blog" className="link-dark link-underline link-underline-opacity-0 link-opacity-75-hover fw-semibold">
                                Blog from others
                            </Link>
                        ) : 'Blogs'}
                    </h3>
                    {homePath ? ''
                    : (isAuth) ? (
                        <p className="text-start mx-4">
                            <Link className="link-dark link-underline link-underline-opacity-0 link-opacity-75-hover" to="./add">
                                <FaMicroblog className="mb-1 me-1"/>Post
                            </Link>
                        </p>
                    ) : null}
                    <div className="row row-cols-2 gap-5 justify-content-center">
                        {
                            blogList.map(
                                item => {
                                let user = userNameLists.filter( u => u.userId === item.myUserBlogId);
                                return <SingleBlog key={ item.blogId } blog={item} user={user}/>}
                            )
                        }
                    </div>
                </div>
            </section>
    } else if (blogStatus === 'failed'){
        console.log('Error');
        content = <p>{blogError}</p>
    }

    return (
        <Fragment>
            {content}
        </Fragment>
    )
}

Blog.propTypes = {}

export default Blog