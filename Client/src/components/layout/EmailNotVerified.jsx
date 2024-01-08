import { Fragment, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAuthUser, getUserEmailVerify } from '../../reducer/authSlice';
import { MdMarkEmailUnread, MdWarningAmber } from "react-icons/md";
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom';

const EmailNotVerified = () => {
    const user = useSelector(getAuthUser);
    const isVerified = useSelector(getUserEmailVerify);
    const location = useLocation();
    const urlPath = location.pathname;
    const queryStartIndex = urlPath.indexOf('?');
    const verifyPath = queryStartIndex === -1 ? urlPath : urlPath.substring(0, queryStartIndex);
    const isVerifyPath = verifyPath.endsWith('/verify');
    const [sendingEmail, setSendingEmail] = useState(false);
    const [sendingEmailSuccess, setSendingEmailSuccess] = useState(false);

    const reSendVerification = async () => {
        try {
          setSendingEmail(true);
          await axios.post('/api/auth/resend', user);

          setSendingEmailSuccess(true);
        } catch (err) {
          console.log(err.message);
        } finally {
          setSendingEmail(false);
        }
      };
    
  return (
    <Fragment>
        {((Object.keys(user).length !== 0 && !isVerified) && !isVerifyPath) && (
            <div className="container text-center text-warning bg-warning-subtle border border-warning rounded py-3 mb-2 mt-4 w-50">
                {(!sendingEmail && !sendingEmailSuccess) && (
                  <Fragment>
                    <div>
                      <MdWarningAmber className='me-1 mb-2 h-auto' style={{width: '3rem'}} />
                    </div>
                    <span className='fw-semibold'>Email not verified. Please check your inbox for the verification email or <Link onClick={e => reSendVerification()} className='link-warning fw-bold'>resend it</Link>.</span>
                  </Fragment>
                )}
                {sendingEmail && (
                  <Fragment>
                    <div className="text-center">
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                    <span>Resending the email...</span>
                  </Fragment>
                )}
                {sendingEmailSuccess && (
                  <Fragment>
                    <div>
                      <MdMarkEmailUnread className='me-1 mb-2 h-auto' style={{width: '3rem'}} />
                    </div>
                    <span className="fw-semibold">We've resent the verification email. Check your inbox and complete your registration with Bob's Garage.</span>
                  </Fragment>
                )}
            </div>
        )}
    </Fragment>
  )
}

export default EmailNotVerified