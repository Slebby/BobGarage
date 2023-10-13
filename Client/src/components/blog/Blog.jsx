import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { FaMicroblog } from 'react-icons/fa6';
import { Consumer } from '../../context/context';
import SingleBlog from './SingleBlog';

const Blog = props => {
  return(
    <Consumer>
        { value => { const { blogList } = value
            return (
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
                                    blog => (<SingleBlog key={ blog.blogId } blog={blog}/>)
                                )
                            }
                        </div>
                    </div>
                </main>
            )
        }}
    </Consumer>
  )
}

Blog.propTypes = {}

export default Blog