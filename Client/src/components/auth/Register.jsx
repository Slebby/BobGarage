import { useState } from 'react'
import PropTypes from 'prop-types'
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, getIsAuth } from '../../reducer/authSlice';

const Register = props => {
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);
  
  const [registerStatus, setRegisterStatus] = useState('idle');
  
  const [formData, setFormData] = useState({
    usernameInput: '',
    emailInput: '',
    imageInput: '',
    pwdInput: '',
    rePwdInput: '',
    checkBoxInput: false,
    errors: {}
  });
  
  const { usernameInput, emailInput, imageInput, pwdInput, rePwdInput, checkBoxInput, errors } = formData;
  
  const authOnChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
  const canSave = (usernameInput !== '' || emailInput !== '' || pwdInput !== '' || rePwdInput !== '' ) && registerStatus === 'idle';
  
  // checkbox handler
  const onChangeCheckbox = (e) => {
    // console.log(e);
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    });
  };
  
  const authRegisterOnSubmit = e => {
    console.log('Registering...');
    e.preventDefault();
    
    try {
      if(canSave){
        console.log('Saving new User...');
        setRegisterStatus('pending');
        
        const newUser = {
          username: usernameInput,
          email: emailInput,
          password: pwdInput,
          userImage: imageInput
        }
        
        dispatch(register(newUser)).unwrap();
      }
    } catch (err) {
      console.log('Error: ', err);
      return;
    } finally {
      setRegisterStatus('idle');
    }
  }
  
  if(isAuth){
    return <Navigate to='/' />
  }
  
  return (
    <section className="container shadow d-flex justify-content-center my-5 secondary-bg-color rounded w-50">
      <form className="w-75" onSubmit={e => authRegisterOnSubmit(e)}>
        <div className="text-center fw-semibold fs-2 mt-4">
          <p className="mb-4">Sign Up</p>
        </div>
        <div className="mb-3">
          <label htmlFor="usernameInput" className="form-label">Username</label>
          <input type="text" name="usernameInput" id="usernameInput" className="form-control" value={usernameInput} onChange={e => authOnChange(e)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">Email</label>
          <input type="email" name="emailInput" id="emailInput" className="form-control" value={emailInput} onChange={e => authOnChange(e)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="imageInput" className="form-label">Image</label>
          <input type="text" name="imageInput" id="imageInput" className="form-control" value={imageInput} onChange={e => authOnChange(e)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="pwdInput" className="form-label">Password</label>
          <input type="password" name="pwdInput" id="pwdInput" className="form-control" value={pwdInput} onChange={e => authOnChange(e)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="rePwdInput" className="form-label">Re-enter Password</label>
          <input type="password" name="rePwdInput" id="rePwdInput" className="form-control" value={rePwdInput} onChange={e => authOnChange(e)}/>
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" name="checkBoxInput" id="checkBoxInput" className="form-check-input" value={checkBoxInput} onChange={e => onChangeCheckbox(e)}/>
          <label htmlFor="checkBoxInput" className="form-check-label">Accept our Terms of Service.</label>
        </div>
        <div>
          <span className="d-inline-block me-1">Already have an account?</span>
          <Link to="/login" className="link-dark link-underline-dark link-opacity-75-hover fw-bolder">Login Here!</Link>
        </div>
        <div className="mt-4 mb-5 text-center ">
          <button type="submit" className="btn btn-lg main-bg-color w-50 btn-color text-light">Sign Up</button>
        </div>
      </form>
    </section>
  )
}

Register.propTypes = {}

export default Register