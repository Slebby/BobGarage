import { useState, } from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmEmail = () => {
    const [emailForm, setEmailForm] = useState('');
    const [errors, setErrors] = useState('');
    const navigate = useNavigate();

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

    const confirmEmailOnSubmit = e => {
        e.preventDefault();
        console.log('Logging in...');
        
        if(!errorHandling()){
            console.log('Email Passed');
            
            navigate('/email/newpassword');
        }
    }

  return (
    <section className="container shadow d-flex justify-content-center my-5 secondary-bg-color rounded w-50" id="authForm">
        <form className="w-75" onSubmit={e => confirmEmailOnSubmit(e)} noValidate>
            <div className="text-center fw-semibold fs-2 mt-4">
                <p className="mb-4">Confirm Email</p>
            </div>
            <div className="mb-3">
                <label htmlFor="emailForm" className="form-label">Email</label>
                <input type="email" name="emailForm" id="emailForm" className={`form-control ${errors ? 'is-invalid' : ''}`} value={emailForm} onChange={e => emailOnChange(e)}/>
                {errors && (
                    <div className="text-danger form-text">{errors}</div>
                )}
            </div>
            <div className="my-4 text-center ">
                <button type="submit" className="btn btn-lg main-bg-color w-50 btn-color text-light">Confirm</button>
            </div>
        </form>
    </section>
  )
}

export default ConfirmEmail