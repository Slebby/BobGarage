import { useState, } from 'react';
import axios from 'axios';
import Spinner from '../../layout/Spinner';

const ConfirmEmail = () => {
    const [emailForm, setEmailForm] = useState('');
    const [errors, setErrors] = useState('');
    const [pageIsLoading, setPageIsLoading] = useState(false);
    const [confirmEmailStatus, setConfirmEmailStatus] = useState('');

    const emailOnChange = (e) => {
        setEmailForm(e.target.value);
    };

    const errorHandling = () => {
        console.log('Checking for error...');
        
        let emailError = '';
    
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
        if(emailForm === "") {
          console.log('Email is empty');
          emailError = "Email is empty";
        } else if (!emailPattern.test(emailForm)){
          console.log('Invalid Email form');
          emailError = "Invalid Email Address";
        }
    
        console.log('Checking Error Done');
    
        if(emailError.length === 0){
          console.log("No Errors");

          setErrors('');
          return false;
        } else {
            console.log('Errors');
            setErrors(emailError);
          return true;
        }
      };

    const confirmEmailOnSubmit = async (e) => {
        e.preventDefault();
        console.log('Logging in...');
        
        if(!errorHandling()){
            try {
                console.log('Email Passed');
                console.log(emailForm);
                setPageIsLoading(true);
                
                const res = await axios.post('/api/auth/confirm', { email: emailForm });
                setConfirmEmailStatus(res.data);
            } catch (err) {
                console.log(err.message);
                setConfirmEmailStatus(err.response.data);
            } finally {
                setPageIsLoading(false);
            }
        }
    }

  return (
    <section className="container shadow d-flex justify-content-center my-5 secondary-bg-color rounded w-50" id="authForm">
        {pageIsLoading && (
            <Spinner loadingLabel="Sending" />
        )}
        <form className="w-75" onSubmit={e => confirmEmailOnSubmit(e)} noValidate>
            <div className="text-center fw-semibold fs-2 mt-4">
                <p className="mb-4">Confirm Email</p>
            </div>
            {confirmEmailStatus && (
                <div className={`container text-center rounded py-3 my-2 w-50 ${confirmEmailStatus !== 'Email Sent!' ? 'text-danger bg-danger-subtle border border-danger': 'text-success bg-success-subtle border border-success'} `}>
                    <span>{confirmEmailStatus}</span>
                </div>
            )}
            <div className="mb-3">
                <label htmlFor="emailForm" className="form-label">Email</label>
                <input type="email" name="emailForm" id="emailForm" className={`form-control ${errors ? 'is-invalid' : ''}`} value={emailForm} onChange={e => emailOnChange(e)}/>
                {errors && (
                    <div className="text-danger form-text">{errors}</div>
                )}
            </div>
            <div className="my-4 text-center ">
                <button type="submit" className="btn btn-lg main-bg-color w-75 btn-color text-light" disabled={confirmEmailStatus === 'Email Sent!' ? true : false}>Send Verification</button>
            </div>
        </form>
    </section>
  )
}

export default ConfirmEmail