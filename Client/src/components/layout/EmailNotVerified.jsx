import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { getAuthUser, getUserEmailVerify } from '../../reducer/authSlice';
import { IoWarningOutline } from "react-icons/io5";
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

    const reSendVerification = async () => {
        try {
          const res = await axios.post('/api/auth/resend', user);
          setVerificationStatus(res.data);
        } catch (err) {
          console.log(err.message);
        }
      };
    
  return (
    <Fragment>
        {((Object.keys(user).length !== 0 && !isVerified) && !isVerifyPath) && (
            <div className="container text-center text-warning bg-warning-subtle border border-warning rounded py-3 mb-2 mt-4 w-50">
                <div>
                    <IoWarningOutline className='me-1 mb-2 h-auto' style={{width: '3rem'}} />
                </div>
                <span className='fw-semibold'>Email not verified. Please check your inbox for the verification email or <Link onClick={e => reSendVerification()} className='link-warning fw-bold'>resend it</Link>.</span>
            </div>
        )}
    </Fragment>
  )
}

export default EmailNotVerified