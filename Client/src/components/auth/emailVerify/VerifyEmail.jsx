import { Fragment } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "../../../reducer/authSlice";

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  
  console.log(queryParams);
  console.log(location.search);
  console.log(token);

  if(token){
    try {
      dispatch(verifyEmail(token));
    } catch (err) {
      console.log('Error: ', err);
      return;
    }
  }

  return (
    <section className='container my-5'>
      {!token && (
        <Fragment>
            <p>
              Thanks for signing up with Bob's Garage! To activate your account, please check your email and click the verification link we sent you. If you don't see the email, check your spam folder. Need assistance? Contact us at  <Link to='mailto:support@bobsgarage.com'>support@bobsgarage.com</Link>.
            </p>
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
    </section>
  )
}

export default VerifyEmail