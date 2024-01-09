import React from 'react';
import { Link } from 'react-router-dom';
import { TbShieldCheck } from "react-icons/tb";

const PwdResetConfirmation = () => {
  return (
    <section className="container my-5">
        <div className="text-center mb-3">
            <TbShieldCheck className='h-auto w-50 text-success' />
        </div>
        <p>
            Your password has been successfully reset! You can now log in to your Bob's Garage account using your new password.
        </p>
        <p>
            For any further assistance or inquiries, please don't hesitate to contact our support team at <Link to='mailto:support@bobsgarage.com'>support@bobsgarage.com</Link>. Thank you!
        </p>
        <div className="my-5 text-center ">
          <Link to='/login' className="btn btn-lg main-bg-color w-75 btn-color text-light">Login Here</Link>
        </div>
    </section>
  )
}

export default PwdResetConfirmation