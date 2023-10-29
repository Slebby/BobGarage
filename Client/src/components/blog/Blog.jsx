import { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { FaMicroblog } from 'react-icons/fa6';
import SingleBlog from './SingleBlog';
import { useSelector } from 'react-redux';
import { selectAllBlogs, getBlogError, getBlogStatus } from '../../reducer/blogSlice';

const Blog = props => {
    const blogList = useSelector(selectAllBlogs);
    const blogStatus = useSelector(getBlogStatus);
    const blogError = useSelector(getBlogError);

    console.log(blogList);

    let content;
    if(blogStatus === 'loading'){
        console.log('loading...');
        content = <p>Loading...</p>
    } else if (blogStatus === 'succeeded'){
        console.log('Success!');
        content =
            <main className="mb-5">
                <div className="container text-center">
                    <h3 className="m-4 fw-semibold">Blogs</h3>
                    <p className="text-start mx-4">
                        <Link className="link-dark link-underline link-underline-opacity-0 link-opacity-75-hover" to="./add">
                            <FaMicroblog className="mb-1 me-1"/>Post
                        </Link>
                    </p>
                    <div className="row row-cols-2 gap-5 justify-content-center">
                        {
                            blogList.map(
                                item => (<SingleBlog key={ item.blogId } blog={item}/>)
                            )
                        }
                    </div>
                </div>
            </main>
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