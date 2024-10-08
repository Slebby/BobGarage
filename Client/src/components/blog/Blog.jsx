import { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom';
import { FaMicroblog } from 'react-icons/fa6';
import SingleBlog from './SingleBlog';
import { useSelector } from 'react-redux';
import { selectAllBlogs, getBlogError, getBlogStatus } from '../../reducer/blogSlice';
import { getIsAuth } from '../../reducer/authSlice';
import { selectAll_User } from '../../reducer/userSlice';
import Spinner from '../layout/Spinner';

const Blog = props => {
    const pathLocation = useLocation().pathname;
    const blogList = useSelector(selectAllBlogs);
    const blogStatus = useSelector(getBlogStatus);
    const blogError = useSelector(getBlogError);
    const isAuth = useSelector(getIsAuth);
    const userNameLists = useSelector(selectAll_User);

    const homePath = pathLocation === '/';

    let blogs = [...blogList];
    const [sortOption, setSortOption] = useState("relevance");
    
    if(sortOption === "oldest") {
        blogs.sort((a, b) => {
            let dateA = new Date(a.createdAt),
            dateB = new Date(b.createdAt);
            return dateB - dateA;
        });
    } else if(sortOption === "newest") {
        blogs.sort((a, b) => {
            let dateA = new Date(a.createdAt),
            dateB = new Date(b.createdAt);
            return dateA - dateB;
        });
    } else if(sortOption === "relevance") {
        blogs = blogList;
    }

    let content;
    if(blogStatus === 'loading'){
        console.log('loading...');
        content = <Spinner loadingLabel="Loading"/>
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
                        <div className="text-start m-4 pb-3">
                            <span>
                                <Link className="link-dark link-underline link-underline-opacity-0 link-opacity-75-hover" to="./add">
                                    <FaMicroblog className="mb-1 me-1"/>Post
                                </Link>
                            </span>
                            <div className="dropdown float-end">
                                <button className="btn main-bg-color btn-color text-light dropdown-toggle text-capitalize" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Sort By {sortOption}
                                </button>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" onClick={e => setSortOption("relevance")}>Relevance</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" onClick={e => setSortOption("newest")}>Newest</Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" onClick={e => setSortOption("oldest")}>Oldest</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="dropdown text-end mb-4">
                            <button className="btn main-bg-color btn-color text-light dropdown-toggle text-capitalize" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Sort By {sortOption}
                            </button>
                            <ul className="dropdown-menu">
                                <li>
                                    <Link className="dropdown-item" onClick={e => setSortOption("relevance")}>Relevance</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" onClick={e => setSortOption("newest")}>Newest</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" onClick={e => setSortOption("oldest")}>Oldest</Link>
                                </li>
                            </ul>
                        </div>
                    )}
                    <div className="row row-cols-2 gap-5 justify-content-center">
                        {
                            blogs.map(
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