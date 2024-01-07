import { useState } from 'react';
import PropTypes from 'prop-types'
import { Link, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register, getUserEmailVerify, getIsAuth } from '../../reducer/authSlice';
import { storage } from '../../utils/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';
import Spinner from '../layout/Spinner';

const Register = props => {
  const dispatch = useDispatch();
  const isVerified = useSelector(getUserEmailVerify);
  const isAuth = useSelector(getIsAuth);
  
  const [registerStatus, setRegisterStatus] = useState('idle');
  
  const [formData, setFormData] = useState({
    usernameInput: '',
    emailInput: '',
    pwdInput: '',
    rePwdInput: '',
    checkBoxInput: false,
    errors: {}
  });
  
  const { usernameInput, emailInput, pwdInput, rePwdInput, checkBoxInput, errors } = formData;
  
  const authOnChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [pageIsLoading, setPageIsLoading] = useState(false);
  // Image handling
  const [imageUpload, setImageUpload] = useState(null);

  const handleImageChange = e => {
    setImageUpload(e.target.files[0]);
  };

  const uploadImageThenReturnURL = async() => {
    console.log(imageUpload);
    try {
      if(imageUpload != null){
        const imageRef = ref(storage, `userImages/${usernameInput}/${v4() + '_' + imageUpload.name}`);
    
        await uploadBytes(imageRef, imageUpload);
        const getImageURL = await getDownloadURL(imageRef);
  
        console.log(getImageURL);
  
        return getImageURL;
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };
  
  const canSave = (usernameInput !== '' || emailInput !== '' || pwdInput !== '' || rePwdInput !== '' ) && registerStatus === 'idle';
  
  // checkbox handler
  const onChangeCheckbox = (e) => {
    // console.log(e);
    setFormData({
      ...formData,
      [e.target.name]: e.target.checked,
    });
  };

  // Regex
  const uppercaseChar = /[A-Z]/;
  const lowercaseChar = /[a-z]/;
  const numberInChar = /\d/;
  const specialChar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

  const [strongPasswordStatus, setStrongPasswordStatus] = useState(0);
  const [numberInCharsBarDone, setNumberInCharsBarDone] = useState(false);
  const [specialCharsBarDone, setSpecialCharsBarDone] = useState(false);
  const [upperCaseCharsBarDone, setUpperCaseCharsBarDone] = useState(false);
  const [lowercaseCharsBarDone, setLowercaseCharsBarDone] = useState(false);

  const strongPasswordBar = () =>{
    const specialCharCount = pwdInput.match(/[^a-zA-Z0-9]/g) ? pwdInput.match(/[^a-zA-Z0-9]/g).length : null;
    const upperCaseCharCount = pwdInput.match(/[A-Z]/g) ? pwdInput.match(/[A-Z]/g).length : null;
    const lowercaseCharCount = pwdInput.match(/[a-z]/g) ? pwdInput.match(/[a-z]/g).length : null;
    const numberInCharCount = pwdInput.match(/\d/g) ? pwdInput.match(/\d/g).length : null;


    const minimumHowStrong = 2;

    if(specialCharCount >= minimumHowStrong && !specialCharsBarDone){
      setStrongPasswordStatus((number) => number + 25);
      setSpecialCharsBarDone(true);
    } else if (specialCharCount <= minimumHowStrong && specialCharsBarDone){
      setStrongPasswordStatus((number) => number - 25);
      setSpecialCharsBarDone(false);
    }

    if(upperCaseCharCount >= minimumHowStrong && !upperCaseCharsBarDone){
      setStrongPasswordStatus((number) => number + 25);
      setUpperCaseCharsBarDone(true);
    } else if (upperCaseCharCount <= minimumHowStrong && upperCaseCharsBarDone){
      setStrongPasswordStatus((number) => number - 25);
      setUpperCaseCharsBarDone(false);
    }

    if(lowercaseCharCount >= minimumHowStrong && !lowercaseCharsBarDone){
      setStrongPasswordStatus((number) => number + 25);
      setLowercaseCharsBarDone(true);
    } else if (lowercaseCharCount <= minimumHowStrong && lowercaseCharsBarDone){
      setStrongPasswordStatus((number) => number - 25);
      setLowercaseCharsBarDone(false);
    }

    if(numberInCharCount >= minimumHowStrong && !numberInCharsBarDone){
      setStrongPasswordStatus((number) => number + 25);
      setNumberInCharsBarDone(true);
    } else if (numberInCharCount <= minimumHowStrong && numberInCharsBarDone){
      setStrongPasswordStatus((number) => number - 25);
      setNumberInCharsBarDone(false);
    }
  };

  const strongPasswordColorBars = () => {
    if (strongPasswordStatus >= 50 && strongPasswordStatus < 75){
      return 'bg-warning text-dark';
    } else if (strongPasswordStatus >= 75 && strongPasswordStatus < 100){
      return 'bg-success';
    } else if (strongPasswordStatus === 100){
      return 'bg-success progress-bar-striped progress-bar-animated';
    }
    return 'bg-danger';
  };

  const strongPasswordText = () => {
    if (strongPasswordStatus >= 0 && strongPasswordStatus < 50){
      return 'Bad';
    } else if (strongPasswordStatus >= 50 && strongPasswordStatus < 75){
      return 'Decent';
    } else if (strongPasswordStatus >= 75 && strongPasswordStatus < 100){
      return 'Great';
    } else if (strongPasswordStatus === 100){
      return 'Very Good';
    }
    return '';
  };

  const errorHandling = () => {
    console.log('Checking for error...');

    const newErrors = {};

    const excludeSpecialChar = /^[a-zA-Z0-9]+$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if(usernameInput === ""){
      console.log('Username is empty');
      newErrors.usernameErr = "Username is empty";
    } else if (!excludeSpecialChar.test(usernameInput)) {
      console.log("Username shouldn't include any special characters");
      newErrors.usernameErr = "Username shouldn't include any special characters";
    }
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
    } else if (pwdInput.length < 8) {
      console.log('Password should have more than 8');
      newErrors.pwdErr = 'Password should have more than 8';
    } else if (!uppercaseChar.test(pwdInput)) {
      console.log('Password should have 1 uppercase character');
      newErrors.pwdErr = 'Password should have 1 uppercase character';
    } else if (!lowercaseChar.test(pwdInput)) {
      console.log('Password should have 1 lowercase character');
      newErrors.pwdErr = 'Password should have 1 lowercase character';
    } else if (!numberInChar.test(pwdInput)){
      console.log('Password should have 1 number');
      newErrors.pwdErr = 'Password should have 1 number';
    } else if (!specialChar.test(pwdInput)) {
      console.log('Password should have 1 special character');
      newErrors.pwdErr = 'Password should have 1 special character';
    }
    if(rePwdInput === ""){
      console.log("Re-enter Password is empty");
      newErrors.rePwdErr = "Re-enter Password is empty";
    }
    if(pwdInput !== rePwdInput){
      console.log('Password is not match');
      newErrors.rePwdErr = "Password is not match";
    }
    if(checkBoxInput === false){
      console.log("Didn't accept the Terms of Service");
      newErrors.checkboxErr = "Please accept the terms of service";
    }

    // console.log(newErrors);
    
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
  
  const authRegisterOnSubmit = async (e) => {
    console.log('Registering...');
    e.preventDefault();

    if(!errorHandling()){
      try {
        if(canSave){
          console.log('Saving new User...');
          setRegisterStatus('pending');
          setPageIsLoading(true);
          
          const userImage = await uploadImageThenReturnURL() || null;

          const newUser = {
            username: usernameInput,
            email: emailInput,
            password: pwdInput,
            userImage
          }
          
          dispatch(register(newUser)).unwrap();
        }
      } catch (err) {
        console.log('Error: ', err);
        setPageIsLoading(false);
        return;
      } finally {
        setRegisterStatus('idle');
      }
    };
  }
  
  if(isAuth && !isVerified){
    return <Navigate to='/email/verify' />
  } else if(isAuth && isVerified) {
    return <Navigate to='/' />
  }
  
  return (
    <section className="container shadow d-flex justify-content-center my-5 secondary-bg-color rounded w-50" id="authForm">
      {pageIsLoading && (
        <Spinner loadingLabel="Registering" />
      )}
      <form className="w-75" onSubmit={e => authRegisterOnSubmit(e)} noValidate>
        <div className="text-center fw-semibold fs-2 mt-4">
          <p className="mb-4">Sign Up</p>
        </div>
        <div className="mb-3">
          <label htmlFor="usernameInput" className="form-label">Username</label>
          <input type="text" name="usernameInput" id="usernameInput" className={`form-control ${errors.usernameErr && !usernameInput ? 'is-invalid' : ''}`} value={usernameInput} onChange={e => authOnChange(e)}/>
          {errors.usernameErr && !usernameInput && (
            <div className="text-danger form-text">{errors.usernameErr}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">Email</label>
          <input type="email" name="emailInput" id="emailInput" className={`form-control ${errors.emailErr ? 'is-invalid' : ''}`} value={emailInput} onChange={e => authOnChange(e)}/>
          {errors.emailErr && (
            <div className="text-danger form-text">{errors.emailErr}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="imageInput" className="form-label">Profile Picture</label>
          <input type="file" name="imageInput" id="imageInput" className="form-control" onChange={e => handleImageChange(e)}/>
          <span className="form-text">This is optional</span>
        </div>
        <div className="mb-3">
          <label htmlFor="pwdInput" className="form-label">Password</label>
          <input type="password" name="pwdInput" id="pwdInput" className={`form-control ${errors.pwdErr && !pwdInput ? 'is-invalid' : ''}`} value={pwdInput} onChange={e => {authOnChange(e);strongPasswordBar();}}/>
          {errors.pwdErr === "Password is empty" && !pwdInput && (
            <div className="text-danger form-text">{errors.pwdErr}</div>
          )}
          <div className="form-text my-2">
            <div>
              <span>Your password must include:</span>
              <ul>
                <li className={`${pwdInput.length < 8 ? 'text-danger' : ''}`}>At least 8 Characters</li>
                <li className={`${!uppercaseChar.test(pwdInput) ? 'text-danger' : ''}`}>At least 1 Uppercase letter</li>
                <li className={`${!lowercaseChar.test(pwdInput) ? 'text-danger' : ''}`}>At least 1 Lowercase letter</li>
                <li className={`${!numberInChar.test(pwdInput) ? 'text-danger' : ''}`}>At least 1 Number</li>
                <li className={`${!specialChar.test(pwdInput) ? 'text-danger' : ''}`}>At least 1 Special Character</li>
              </ul>
            </div>
            <div className="progress" role="progressbar" aria-label="Strong Password" aria-valuenow={strongPasswordStatus} aria-valuemin="0" aria-valuemax="100">
              <div className={`progress-bar ${strongPasswordColorBars()}`} style={{width: `${strongPasswordStatus}%`}}>{strongPasswordText()}</div>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="rePwdInput" className="form-label">Re-enter Password</label>
          <input type="password" name="rePwdInput" id="rePwdInput" className={`form-control ${errors.rePwdErr ? 'is-invalid' : ''}`} value={rePwdInput} onChange={e => authOnChange(e)}/>
          {errors.rePwdErr && (
            <div className="text-danger form-text">{errors.rePwdErr}</div>
          )}
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" name="checkBoxInput" id="checkBoxInput" className={`form-check-input ${errors.checkboxErr ? 'is-invalid' : '' }`} value={checkBoxInput} onChange={e => onChangeCheckbox(e)}/>
          <label htmlFor="checkBoxInput" className="form-check-label">Accept our Terms of Service.</label>
          {errors.checkboxErr  && (
            <div className="text-danger form-text">{errors.checkboxErr}</div>
          )}
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