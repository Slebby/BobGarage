import React from 'react';
import { Link } from 'react-router-dom';
import { FaAnglesLeft } from 'react-icons/fa6';

const AddFeedback = () => {
  return (
    <div className="container mb-5">
        <h3 className="text-center m-4 fw-semibold">Add Feedback</h3>
        <p>
            <Link className="link-dark link-underline link-underline-opacity-0 link-opacity-75-hover" to="/feedback">
                <FaAnglesLeft className="mb-1 me-1"/>Back
            </Link>
        </p>
        <section className="card secondary-bg-color border-0">
            <form>
                <header className="card-header header-bg-color border-bottom-0">
                    <div className="form-floating">
                        <input type="text" name="header" placeholder="Header Text Here" id="floatingHeader" className="form-control" />
                        <label htmlFor="floatingHeader" className="opacity-75">Header</label>
                    </div>
                </header>
                
                <div className="card-body">
                    <div className="card-text">
                        <div className="form-floating">
                            <textarea type="text" name="feedbackBody" id="floatingText" placeholder="Body Text Here" className="form-control" style={{height: "20rem"}}/>
                            <label htmlFor="floatingText" className="opacity-75">Body</label>
                        </div>
                    </div>
                    <button type="submit" value="Post Feedback" className="btn btn-lg main-bg-color w-100 btn-color text-light mt-3">Submit</button>
                </div>
            </form>
        </section>
    </div>
  )
}

export default AddFeedback