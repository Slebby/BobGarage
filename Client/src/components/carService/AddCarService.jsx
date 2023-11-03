import React, { useState } from 'react';
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
    errors: {}
  });

  const { serviceName, serviceDesc, serviceImage, errors } = formData;
  const navigate = useNavigate();

  const serviceOnChange = e => {
    // console.log(e);

    setFormData({
        ...formData, [e.target.name]: e.target.value
    });
  };

  const serviceOnSubmit = async (e) => {
    e.preventDefault();

    console.log('Add Service - Submitting form...');

    const newService = {
        serviceName,
        serviceDesc,
        serviceImage
    }

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
                            style={{height: "20rem"}} value={serviceDesc}
                            onChange={e => serviceOnChange(e)} />
                            <label htmlFor="floatingText" className="opacity-75">Description</label>
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