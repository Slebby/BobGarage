import { useState, Fragment, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaAnglesLeft } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { selectCarServiceByID, updateCarService } from '../../reducer/carServiceSlice';

const EditCarService = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
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

  const { serviceName, serviceDesc, serviceImage, servicePrice, servicePriceDecimal, errors } = formData;

  const canSave = serviceName !== undefined && serviceDesc !== undefined && serviceImage !== undefined && servicePrice !== undefined && servicePriceDecimal !== undefined && requestStatus === 'idle';

  const serviceOnChange = (e) => {
    // console.log(e);

    setFormData({
        ...formData, [e.target.name]: e.target.value
    });
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

    const updService = {
        serviceId: id,
        serviceName,
        serviceDesc,
        serviceImage,
        servicePrice: parseFloat(`${servicePrice}.${servicePriceDecimal}`)
    }

    try {
        if(canSave){
            console.log('Can save... updating');
            setRequestStatus('pending');
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
  };

    return (
    <div className="container mb-5">
        <h3 className="text-center m-4 fw-semibold">Edit Car Service</h3>
        <p>
            <Link className="link-dark link-underline link-underline-opacity-0 link-opacity-75-hover" to="/service">
                <FaAnglesLeft className="mb-1 me-1"/>Back
            </Link>
        </p>
        <section className="card secondary-bg-color border-0">
            <form onSubmit={e => serviceOnSubmit(e)}>
                <div className="card-body">
                    <div className="card-title">
                        <div className="form-floating">
                            <input type="text" name="serviceName" id="floatingName" placeholder="Name Text Here" className="form-control" value={serviceName}
                            onChange={e => serviceOnChange(e)} />
                            <label htmlFor="floatingName" className="opacity-75">Name</label>
                        </div>
                    </div>
                    <div className="card-text">
                        <div className="form-floating">
                            <textarea
                            type="text"
                            name="serviceDesc"
                            id="floatingText"
                            placeholder="Desc Text Here"
                            className="form-control"
                            style={{height: "20rem"}} value={serviceDesc}
                            onChange={e => serviceOnChange(e)} />
                            <label htmlFor="floatingText" className="opacity-75">Description</label>
                        </div>
                    </div>
                    <div className="input-group card-subtitle my-1 w-50 container">
                        <span className="input-group-text fs-4">&#x0024;</span>
                        <div className="form-floating w-10">
                            <input
                            type="number"
                            name="servicePrice"
                            id="servicePrice"
                            placeholder="Number"
                            className="form-control"
                            value={servicePrice ? servicePrice : ''}
                            onChange={e => numberOnChange(e, 10)}
                            onKeyDown={e => handleKeyPress(e)}
                            inputMode="numeric"
                            pattern="[0-9]*"/>
                            <label htmlFor="servicePrice" className="opacity-75">Price</label>
                        </div>
                        <span className="input-group-text fs-4">&#x002E;</span>
                        <div className="form-floating">
                            <input type="number" name="servicePriceDecimal" id="servicePriceDecimal" placeholder="00" className="form-control" value={servicePriceDecimal ? servicePriceDecimal : ''}
                            onKeyDown={e => handleKeyPress(e)}
                            onChange={e => numberOnChange(e, 2)}/>
                            <label htmlFor="servicePriceDecimal" className="opacity-75">Decimal &#x0028;00&#x0029;</label>
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