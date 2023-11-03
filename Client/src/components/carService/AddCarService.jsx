import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaAnglesLeft } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { addNewCarService } from '../../reducer/carServiceSlice';

const AddCarService = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    serviceName: '',
    serviceDesc: '',
    serviceImage: null,
    servicePrice: 0,
    servicePriceDecimal: 0,
    errors: {}
  });

  const { serviceName, serviceDesc, serviceImage, servicePrice, servicePriceDecimal, errors } = formData;
  const navigate = useNavigate();

  const serviceOnChange = e => {
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

    console.log('Add Service - Submitting form...');

    const newService = {
        serviceName,
        serviceDesc,
        serviceImage,
        servicePrice: parseFloat(`${servicePrice}.${servicePriceDecimal}`)
    }

    // console.log(newService);

    dispatch(addNewCarService(newService));

    navigate('/service');
  };

    return (
    <div className="container mb-5">
        <h3 className="text-center m-4 fw-semibold">Add Car Service</h3>
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
                            style={{height: "20rem"}}
                            value={serviceDesc}
                            onChange={e => serviceOnChange(e)}
                            inputMode="numeric"
                            pattern="[0-9]*"/>
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
                    <button type="submit" value="Post Feedback" className="btn btn-lg main-bg-color w-100 btn-color text-light mt-3">Add</button>
                </div>
            </form>
        </section>
    </div>
    )
}

export default AddCarService