import { Fragment, useState } from "react";
import axios from "axios";
import { useLocation, Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail, getAuthUser } from "../../../reducer/authSlice";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const fromLoginPage = location.pathname;
  const user = useSelector(getAuthUser);
  const [verificationStatus, setVerificationStatus] = useState('');
  
  console.log(queryParams);
  console.log(location.search);
  console.log(token);
  console.log(fromLoginPage);

  if(token && !user.email_Verified){
    try {
      dispatch(verifyEmail(token));
    } catch (err) {
      console.log('Error: ', err);
      return;
    }
  }

  if(typeof(user) === "object" && Object.keys(user).length !== 0 && user.email_Verified) {
    return <Navigate to="/"/>
  }

  const reSendVerification = async () => {
    try {
      const res = await axios.post('/api/auth/resend', user);
      setVerificationStatus(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const verificationButton = (
    <div className="my-4 text-center">
      <button type="button" className="btn btn-lg main-bg-color w-50 btn-color text-light" onClick={e => reSendVerification()}>Resend Verification</button>
      {verificationStatus}
    </div>
  )

  return (
    <section className='container my-5'>
      {!token && !fromLoginPage && (
        <Fragment>
            <p>
              Thanks for signing up with Bob's Garage! To activate your account, please check your email and click the verification link we sent you. If you don't see the email, check your spam folder or click 'Resend Verification' below. Need assistance? Contact us at <Link to='mailto:support@bobsgarage.com'>support@bobsgarage.com</Link>.
            </p>
            {verificationButton}
        </Fragment>      
      )}
      {token && (
        <Fragment>
          <p>
            Congratulations! Your email has been successfully verified, and your account with Bob's Garage is now active. Welcome to our community of automotive enthusiasts! Feel free to explore our services and don't hesitate to reach out if you have any questions.
          </p>
          <p>
            Happy driving,
          </p>
          <p>
            The Bob's Garage Team
          </p>
        </Fragment>
      )}
      {!token && fromLoginPage && (
        <Fragment>
          <p>
            Oops! It looks like your email hasn't been verified yet. To complete your registration and access your account, please check your email for a verification link. If you can't find it, click 'Resend Verification' below. Need help? Contact us at <Link to='mailto:support@bobsgarage.com'>support@bobsgarage.com</Link>.
          </p>
          {verificationButton}
        </Fragment>
      )}
    </section>
  )
}

export default VerifyEmail