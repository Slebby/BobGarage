import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, getIsAuth, getAuthStatus, getUserEmailVerify } from '../../reducer/authSlice';
import Spinner from '../layout/Spinner';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = props => {
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);
  const loginError = useSelector(getAuthStatus);
  const isVerified = useSelector(getUserEmailVerify);

  const [formData, setFormData] = useState({
    emailInput: '',
    pwdInput: '',
    errors: {}
  });

  const [showPassword, setShowPassword] = useState(false);

  const showingPwd = () => {
    if(showPassword){
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  }

  const [pageIsLoading, setPageIsLoading] = useState(false);
  
  const { emailInput, pwdInput, errors } = formData;
  
  const authOnChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  };

  const errorHandling = () => {
    console.log('Checking for error...');

    const newErrors = {};

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(emailInput === "") {
      console.log('Email is empty');
      newErrors.emailErr = "Email is empty";
    } else if (!emailPattern.test(emailInput)){
      console.log('Invalid Email form');
      newErrors.emailErr = "Invalid Email Address";
    }
    if(pwdInput === ""){
      console.log('Password is empty');
      newErrors.pwdErr = "Password is empty";
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
  }
  
  const authLoginOnSubmit = e => {
    e.preventDefault();
    console.log('Logging in...');
    
    if(!errorHandling()){
      setPageIsLoading(true);

      try {
        const credential = {
          email: emailInput,
          password: pwdInput
        }
        
        dispatch(login(credential)).unwrap();
      } catch (err) {
        console.log(err);
        setPageIsLoading(false);
      }
    }
  }

  if(isAuth && isVerified){
    return <Navigate to="/" />
  } else if(isAuth && !isVerified) {
    return <Navigate to="/login/verify" />
  }

  return (
    <section className="container shadow d-flex justify-content-center my-5 secondary-bg-color rounded w-50" id="authForm">
      {pageIsLoading && loginError !== 'error' && (
        <Spinner loadingLabel="Logging in" />
      )}
        <form className="w-75" onSubmit={e => authLoginOnSubmit(e)} noValidate>
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
            <input type="email" name="emailInput" id="emailInput" className={`form-control ${errors.emailErr ? 'is-invalid' : ''}`} value={emailInput} onChange={e => authOnChange(e)}/>
            {errors.emailErr && (
            <div className="text-danger form-text">{errors.emailErr}</div>
          )}
          </div>
          <div className="mb-3">
            <label htmlFor="pwdInput" className="form-label">Password</label>
            <div className="input-group">
              <input type={showPassword ? 'text' : 'password'} name="pwdInput" id="pwdInput" className={`form-control form-password ${errors.pwdErr && !pwdInput ? 'is-invalid' : ''}`} value={pwdInput} onChange={e => authOnChange(e)}/>
              <span className='input-group-text' onClick={e => showingPwd()} style={{cursor: 'pointer'}}>{showPassword ? (<FaEye />) : (<FaEyeSlash/>)}</span>
            </div>
            {errors.pwdErr && !pwdInput && (
            <div className="text-danger form-text">{errors.pwdErr}</div>
          )}
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