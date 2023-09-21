import React from 'react'
import PropTypes from 'prop-types'

const Login = props => {
  return (
    <section className="container d-flex justify-content-center my-5 secondary-bg-color rounded w-50">
        <form className="w-75">
          <div className="text-center fs-2 mt-4">
            <p className="mb-4">Login</p>
          </div>
          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">Email</label>
            <input type="email" name="emailInput" id="emailInput" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="pwdInput" className="form-label">Password</label>
            <input type="password" name="pwdInput" id="pwdInput" className="form-control" />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" name="checkBoxInput" id="checkBoxInput" className="form-check-input" />
            <label htmlFor="checkBoxInput" className="form-check-label">Remember me</label>
          </div>
          <div className="mt-4 mb-5 text-center ">
            <button type="submit" className="btn btn-lg main-bg-color w-50 btn-color text-light">Login</button>
          </div>
        </form>
    </section>
  )
}

Login.propTypes = {}

export default Login