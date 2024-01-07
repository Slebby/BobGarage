import { useState, Fragment, useEffect } from 'react';
import { Link, useNavigate, useParams, Navigate } from 'react-router-dom';
import { FaAnglesLeft } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { selectCarServiceByID, updateCarService } from '../../reducer/carServiceSlice';
import { getIsAuth, getIsStaff, getUserEmailVerify } from '../../reducer/authSlice';
import { storage } from '../../utils/firebase';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { v4 } from 'uuid';
import Spinner from '../layout/Spinner';

const EditCarService = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isStaff = useSelector(getIsStaff);
  const isAuth = useSelector(getIsAuth);
  const isVerified = useSelector(getUserEmailVerify);

  if(!isStaff && !isAuth){
    return <Navigate to='/service' />
  } else if((isStaff && isAuth) && !isVerified){
    return <Navigate to='/email/verify' />
  }

  const { id } = useParams();
  //   console.log(id);
  const carService = useSelector((state) => selectCarServiceByID(state, id));
  console.log(carService);
  if(!carService){
    return(
        <Fragment>
            <h2>Car Service not found!</h2>
        </Fragment>
    )
  }

  // split the price based on decimal point
  const priceFloat = carService.servicePrice;
  const priceString = priceFloat.toString();
  const priceParts = priceString.split('.');
  // Check if it's 2 digits number or not
  const priceDecimal = priceParts[1] >= 0 && priceParts[1] <= 9 ? priceParts[1].padEnd(2, '0') : priceParts[1];
  
  const [formData, setFormData] = useState({
    serviceName: carService.serviceName,
    serviceDesc: carService.serviceDesc,
    serviceImage: carService.serviceImage,
    servicePrice: priceParts[0],
    servicePriceDecimal: priceDecimal || '00',
    errors: {}
  });

  const [requestStatus, setRequestStatus] = useState('idle');
  // Image handling
  const [imageUpload, setImageUpload] = useState(null);

  const handleImageChange = e => {
    setImageUpload(e.target.files[0]);
  };
  
  const uploadImageThenReturnURL = async() => {
    console.log(imageUpload);
    try {
      if(imageUpload != null){
        const imageRef = ref(storage, `carServiceImages/${v4() + '_' + imageUpload.name}`);
    
        await uploadBytes(imageRef, imageUpload);
        const getImageURL = await getDownloadURL(imageRef);
  
        console.log(getImageURL);
  
        return getImageURL;
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  };

  const deleteImage = async() => {
    try {
      if(serviceImage != null){
        const imageRef = ref(storage, serviceImage);
        await deleteObject(imageRef);
      }
    } catch (err) {
      console.log(`Error: ${err}`);
    }
  }

  const { serviceName, serviceDesc, serviceImage, servicePrice, servicePriceDecimal, errors } = formData;

  const canSave = serviceName !== undefined && serviceDesc !== undefined && serviceImage !== undefined && servicePrice !== undefined && servicePriceDecimal !== undefined && requestStatus === 'idle';

  const serviceOnChange = (e) => {
    // console.log(e);

    setFormData({
        ...formData, [e.target.name]: e.target.value
    });
  };

  const errorHandling = () => {
    console.log('Checking for error...');

    const newErrors = {};

    if(serviceName === ""){
      console.log('Service name is empty');
      newErrors.serviceNameErr = "Service name is empty";
    }
    if(serviceDesc === ""){
      console.log('Service Desc is empty');
      newErrors.serviceDescErr = "Service Desc is empty";
    }
    if(servicePrice === "" || servicePrice === 0){
      console.log('Price is empty');
      newErrors.servicePriceErr = "Price is empty";
    } else if (isNaN(servicePrice)){
      console.log('Price is not a number');
      newErrors.servicePriceErr = "Price is not a number";
    } else if (servicePrice.length > 10){
      console.log('Price digit is more than 10 digits');
      newErrors.servicePriceErr = "Price digit is more than 10 digits";
    }
    if(servicePriceDecimal === "" || servicePriceDecimal === 0){
      console.log('Decimal is empty');
      newErrors.servicePriceDeciErr = "Decimal is empty";
    } else if (isNaN(servicePriceDecimal)){
      console.log('Decimal is not a number');
      newErrors.servicePriceDeciErr = "Decimal is not a number";
    } else if (servicePriceDecimal.length > 10){
      console.log('Decimal digit is more than 10 digits');
      newErrors.servicePriceDeciErr = "Decimal digit is more than 10 digits";
    }

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
  };

    // Handle Number Input
    const handleKeyPress = (e) => {
        // Allow number only
        const regex = /^[A-Za-z]$/;
        const keyCode = e.key;
        const disabledKeys = ['.', '-', '+', 'ArrowUp', 'ArrowDown'];

        if (regex.test(keyCode) || disabledKeys.includes(keyCode)) {
            e.preventDefault();
        }
    };

    const numberOnChange = (e, digit) => {
    if (e.target.value.length <= digit ){
        setFormData({
            ...formData, [e.target.name]: e.target.value
        });
    }
    }

    const numberOnScroll = e => {
    e.preventDefault();
    }

    useEffect(() => {
    const inputElement = document.querySelector('input[type="number"]');
    inputElement.addEventListener('wheel', numberOnScroll, { passive: false });

    return () => {
        inputElement.removeEventListener('wheel', numberOnScroll);
    };
    }, []);

  const serviceOnSubmit = async (e) => {
    e.preventDefault();
    console.log('Edit Service - Submitting form...');

    if(!errorHandling()){
      try {
        if(canSave){
          console.log('Can save... updating');
          setRequestStatus('pending');

          await deleteImage();
          const newServiceImage = await uploadImageThenReturnURL() || null;

          const updService = {
            serviceId: id,
            serviceName,
            serviceDesc,
            serviceImage: newServiceImage,
            servicePrice: parseFloat(`${servicePrice}.${servicePriceDecimal}`)
          };
          
          dispatch(updateCarService(updService));
        } else {
          console.log('Cannot Save');
          return;
        }
      } catch (err) {
        console.log('Failed to save the car service', err)
      } finally {
        setRequestStatus('idle');
      }
        navigate('/service');
    }
  };

    return (
    <div className="container mb-5">
      {requestStatus === 'pending' && (
        <Spinner loadingLabel="Updating" />
      )}
        <h3 className="text-center m-4 fw-semibold">Edit Car Service</h3>
        <p>
            <Link className="link-dark link-underline link-underline-opacity-0 link-opacity-75-hover" to="/service">
                <FaAnglesLeft className="mb-1 me-1"/>Back
            </Link>
        </p>
        <section className="card secondary-bg-color border-0">
            <form onSubmit={e => serviceOnSubmit(e)}>
              <div className="p-3 header-bg-color rounded-top">
                <label htmlFor="imageUpload" className="form-label text-light fw-semibold">Upload Image Here</label>
                <input type="file" name="imageUpload" id="imageUpload" onChange={e => handleImageChange(e)} className="form-control"/>
              </div>
                <div className="card-body">
                    <div className="card-title">
                        <div className="form-floating">
                            <input type="text" name="serviceName" id="floatingName" placeholder="Name Text Here" className={`form-control ${errors.serviceNameErr && !serviceName ? 'is-invalid' : ''}`} value={serviceName}
                            onChange={e => serviceOnChange(e)} />
                            <label htmlFor="floatingName" className="opacity-75">Name</label>
                            {errors.serviceNameErr && !serviceName && (
                              <div className="badge form-text bg-danger fs-6">{errors.serviceNameErr}</div>
                            )}
                        </div>
                    </div>
                    <div className="card-text">
                        <div className="form-floating">
                            <textarea
                            type="text"
                            name="serviceDesc"
                            id="floatingText"
                            placeholder="Desc Text Here"
                            className={`form-control ${errors.serviceDescErr && !serviceDesc ? 'is-invalid' : ''}`}
                            style={{height: "20rem"}} value={serviceDesc}
                            onChange={e => serviceOnChange(e)} />
                            <label htmlFor="floatingText" className="opacity-75">Description</label>
                            {errors.serviceDescErr && !serviceDesc && (
                              <div className="badge form-text bg-danger fs-6">{errors.serviceDescErr}</div>
                            )}
                        </div>
                    </div>
                    <div className={`input-group card-subtitle my-1 w-75 container position-relative ${(errors.servicePriceErr || errors.servicePriceDeciErr) && (!servicePrice || !servicePriceDecimal) ? 'mb-4' : '' }`}>
                        <span className="input-group-text fs-4">&#x0024;</span>
                        <div className="form-floating w-10">
                            <input
                            type="number"
                            name="servicePrice"
                            id="servicePrice"
                            placeholder="Number"
                            className={`form-control ${errors.servicePriceErr && !servicePrice ? 'is-invalid' : ''}`}
                            value={servicePrice ? servicePrice : ''}
                            onChange={e => numberOnChange(e, 10)}
                            onKeyDown={e => handleKeyPress(e)}
                            inputMode="numeric"
                            pattern="[0-9]*"/>
                            <label htmlFor="servicePrice" className="opacity-75">Price</label>
                            {errors.servicePriceErr && !servicePrice && (
                              <div className="invalid-tooltip fw-bold fs-6">{errors.servicePriceErr}</div>
                            )}
                        </div>
                        <span className="input-group-text fs-4">&#x002E;</span>
                        <div className="form-floating w-10">
                            <input type="number" name="servicePriceDecimal" id="servicePriceDecimal" placeholder="00" className={`form-control ${errors.servicePriceDeciErr && !servicePriceDecimal ? 'is-invalid' : ''}`} value={servicePriceDecimal ? servicePriceDecimal : ''}
                            onKeyDown={e => handleKeyPress(e)}
                            onChange={e => numberOnChange(e, 2)}/>
                            <label htmlFor="servicePriceDecimal" className="opacity-75">Decimal &#x0028;00&#x0029;</label>
                            {errors.servicePriceDeciErr && !servicePriceDecimal && (
                                <div className="invalid-tooltip fw-bold fs-6">{errors.servicePriceDeciErr}</div>
                            )}
                        </div>
                    </div>
                    <button type="submit" value="Post Feedback" className="btn btn-lg main-bg-color w-100 btn-color text-light mt-3">Update</button>
                </div>
            </form>
        </section>
    </div>
    )
}

export default EditCarService