import { useEffect, useState, } from 'react';
import axios from 'axios';
import Spinner from '../../layout/Spinner';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { VscError } from "react-icons/vsc";
import { useDispatch, useSelector } from 'react-redux';
import { getAuthStatus, getAuthUserID, loadConfirmUser, logout } from '../../../reducer/authSlice';

const NewPassword = () => {
  const [formData, setFormData] = useState({
    pwdInput: '',
    rePwdInput: '',
    errors: {}
  });
  const [pageIsLoading, setPageIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const authStatus = useSelector(getAuthStatus);
  const userId = useSelector(getAuthUserID);
  const navigate = useNavigate();

  const uppercaseChar = /[A-Z]/;
  const lowercaseChar = /[a-z]/;
  const numberInChar = /\d/;
  const specialChar = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  const [strongPasswordStatus, setStrongPasswordStatus] = useState(0);
  const [numberInCharsBarDone, setNumberInCharsBarDone] = useState(false);
  const [specialCharsBarDone, setSpecialCharsBarDone] = useState(false);
  const [upperCaseCharsBarDone, setUpperCaseCharsBarDone] = useState(false);
  const [lowercaseCharsBarDone, setLowercaseCharsBarDone] = useState(false);

  useEffect(() => {
    try {  
      dispatch(loadConfirmUser(token));
    } catch (err) {
      console.log(err.message);
    }
  }, [dispatch]);

  if(authStatus !== 'succeeded' && authStatus !== 'idle'){
    console.log('Verify Failed!');
    return(
      <section className="container my-5">
        <div className="text-center mb-4">
          <VscError className="h-auto w-50 text-danger"/>
        </div>
        <p>
          Oops! It seems like the password reset link is either invalid or has expired. Password reset links are only valid for a limited time. Please initiate the reset process again by clicking "Confirm Email" below.
        </p>
        <p>
          If you continue to experience issues, reach out to our support team at <Link to='mailto:support@bobsgarage.com'>support@bobsgarage.com</Link> for assistance. Thank you for your understanding.
        </p>
        <div className="my-5 text-center ">
          <Link to='/email/confirm' className="btn btn-lg main-bg-color btn-color text-light w-100">Confirm Email</Link>
        </div>
      </section>
    );
  }

  const showingPwd = () => {
    if(showPassword){
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  const showingRePwd = () => {
    if(showRePassword){
      setShowRePassword(false);
    } else {
      setShowRePassword(true);
    }
  };

  const { pwdInput, rePwdInput, errors } = formData;

  const newPwdOnChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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

  const pwdFormOnSubmit = async (e) => {
    e.preventDefault();
    console.log('Submit new password...');
    
    if(!errorHandling()){
      try {
        setPageIsLoading(true);
        console.log(pwdInput);

        const userPayload = {
          userId,
          newPassword: pwdInput
        }

        await axios.post('/api/auth/newpassword', userPayload);
      } catch (err) {
        console.log(err.message);
      } finally {
        setPageIsLoading(false);
        dispatch(logout());
        navigate('/email/newpassword/success');
      }
    }
  }

  return (
    <section className="container shadow d-flex justify-content-center my-5 secondary-bg-color rounded w-50" id="authForm">
      {pageIsLoading && (
        <Spinner loadingLabel="Submiting" />
      )}
      <form className="w-75" onSubmit={e => pwdFormOnSubmit(e)} noValidate>
        <div className="text-center fw-semibold fs-2 mt-4">
          <p className="mb-4">New Password</p>
        </div>
        <div className="mb-3">
          <label htmlFor="pwdInput" className="form-label">Password</label>
          <div className="input-group">
            <input type={showPassword ? 'text' : 'password'} name="pwdInput" id="pwdInput" className={`form-control ${errors.pwdErr && !pwdInput ? 'is-invalid' : ''}`} value={pwdInput} onChange={e => {newPwdOnChange(e);strongPasswordBar();}}/>
            <span className='input-group-text' onClick={e => showingPwd()} style={{cursor: 'pointer'}}>{showPassword ? (<FaEye />) : (<FaEyeSlash/>)}</span>
          </div>
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
          <div className="input-group">
            <input type={showRePassword ? 'text' : 'password'} name="rePwdInput" id="rePwdInput" className={`form-control ${errors.rePwdErr ? 'is-invalid' : ''}`} value={rePwdInput} onChange={e => newPwdOnChange(e)}/>
            <span className='input-group-text' onClick={e => showingRePwd()} style={{cursor: 'pointer'}}>{showRePassword ? (<FaEye />) : (<FaEyeSlash/>)}</span>
          </div>
          {errors.rePwdErr && (
            <div className="text-danger form-text">{errors.rePwdErr}</div>
          )}
        </div>
        <div className="my-4 text-center ">
          <button type="submit" className="btn btn-lg main-bg-color w-75 btn-color text-light">Reset Password</button>
        </div>
      </form>
    </section>
  )
}

export default NewPassword