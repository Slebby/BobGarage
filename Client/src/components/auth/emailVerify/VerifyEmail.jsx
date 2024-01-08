import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail, getAuthUser, getError, logout } from "../../../reducer/authSlice";
import { RiMailCloseLine, RiMailCheckLine, RiErrorWarningFill, RiMailSendLine } from "react-icons/ri";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const fromLoginPage = '/login/verify';
  const user = useSelector(getAuthUser);
  const isError = useSelector(getError);
  const [verificationStatus, setVerificationStatus] = useState('');

  useEffect(() => {
    if(token){
      try {
        dispatch(logout());
        dispatch(verifyEmail(token)).unwrap();
      } catch (err) {
        console.log('Error: ', err);
        return;
      }
    }
  }, []);

  if(user.email_Verified) {
    return <Navigate to="/"/>
  }

  const reSendVerification = async () => {
    try {
      setVerificationStatus('Sending The Verification Link...');

      const res = await axios.post('/api/auth/resend', user);
      setVerificationStatus(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  const verificationButton = (
    <div className="my-4 text-center">
      <button type="button" className="btn btn-lg main-bg-color w-50 btn-color text-light" onClick={e => reSendVerification()} disabled={verificationStatus === 'Sending The Verification Link...'}>Resend Verification</button>
      {verificationStatus && (
        <p className="mt-2">
          {verificationStatus}
        </p>
      )}
    </div>
  )

  const supportEmail = 'support@bobsgarage.com'

  return (
    <section className='container my-5'>
      {!token && fromLoginPage !== location.pathname && (
        <Fragment>
          <div className="text-center">
            <RiMailSendLine className="h-auto w-50 text-secondary"/>
          </div>
          <p>
            Thanks for signing up with Bob's Garage! To activate your account, please check your email and click the verification link we sent you. If you don't see the email, check your spam folder or click 'Resend Verification' below. Need assistance? Contact us at <Link to={`mailto:${supportEmail}`}>{supportEmail}</Link>.
          </p>
          {verificationButton}
        </Fragment>      
      )}
      {token && !isError && (
        <Fragment>
          <div className="text-center">
            <RiMailCheckLine className="h-auto w-50 text-success"/>
          </div>
          <p>
            Congratulations! Your email has been successfully verified, and your account with Bob's Garage is now active. Welcome to our community of automotive enthusiasts! Feel free to explore our services and don't hesitate to reach out if you have any questions.
          </p>
          <p>
            Happy driving,
          </p>
          <p>
            The Bob's Garage Team
          </p>
          <div className="my-4 text-center">
            <Link className="btn btn-lg main-bg-color w-50 btn-color text-light" to='/login'>Login Here</Link>
          </div>
        </Fragment>
      )}
      {!token && fromLoginPage === location.pathname && (
        <Fragment>
          <div className="text-center">
            <RiMailCloseLine className="h-auto w-50 text-warning"/>
          </div>
          <p>
            Oops! It looks like your email hasn't been verified yet. To complete your registration and access your account, please check your email for a verification link. If you can't find it, click 'Resend Verification' below. Need help? Contact us at <Link to={`mailto:${supportEmail}`}>{supportEmail}</Link>.
          </p>
          {verificationButton}
        </Fragment>
      )}
      {isError === "Invalid Verification Link" && (
        <Fragment>
          <div className="text-center">
            <RiErrorWarningFill className="h-auto w-50 text-danger"/>
          </div>
          <p>
            We're sorry, but it seems the verification link may have expired or is invalid. To ensure access to our services, please request a new verification email by clicking "Resend Verification" below. Check your email and complete the verification process.
            </p>
          <p>
            If you continue to face issues or need further assistance, kindly reach out to our support team at <Link to={`mailto:${supportEmail}`}>{supportEmail}</Link> Thank you for your patience!
          </p>
          {verificationButton}
        </Fragment>
      )}
    </section>
  )
}

export default VerifyEmail