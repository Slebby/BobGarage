import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, getIsAuth, getAuthStatus } from '../../reducer/authSlice';

const Login = props => {
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);
  const loginError = useSelector(getAuthStatus);

  const [formData, setFormData] = useState({
    emailInput: '',
    pwdInput: '',
    errors: {}
  });
  
  const { emailInput, pwdInput, errors } = formData;
  
  const authOnChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  };
  
  const authLoginOnSubmit = e => {
    e.preventDefault();
    console.log('Logging in...');
    
    const credential = {
      email: emailInput,
      password: pwdInput
    }
    
    dispatch(login(credential)).unwrap();
  }

  if(isAuth){
    return <Navigate to="/" />
  }

  return (
    <section className="container shadow d-flex justify-content-center my-5 secondary-bg-color rounded w-50">
        <form className="w-75" onSubmit={e => authLoginOnSubmit(e)}>
          <div className="text-center fw-semibold fs-2 mt-4">
            <p className="mb-4">Login</p>
          </div>
          { loginError === 'error' && (
            <div className="container text-center text-danger bg-danger-subtle border border-danger rounded py-3 my-2 w-50">
              <span>Invalid Email or Password</span>
            </div>
          )}
          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">Email</label>
            <input type="email" name="emailInput" id="emailInput" className="form-control" value={emailInput} onChange={e => authOnChange(e)}/>
          </div>
          <div className="mb-3">
            <label htmlFor="pwdInput" className="form-label">Password</label>
            <input type="password" name="pwdInput" id="pwdInput" className="form-control" value={pwdInput} onChange={e => authOnChange(e)}/>
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" name="checkBoxInput" id="checkBoxInput" className="form-check-input" />
            <label htmlFor="checkBoxInput" className="form-check-label">Remember me</label>
          </div>
          <div>
            <span className="d-inline-block me-1">New Here?</span>
            <Link to="/register" className="link-dark link-underline-dark link-opacity-75-hover fw-bolder">Sign up Now!</Link>
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