import React, { useState, Fragment } from 'react';
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
  
  const [formData, setFormData] = useState({
    serviceName: carService.serviceName,
    serviceDesc: carService.serviceDesc,
    serviceImage: null,
    errors: {}
  });

  const { serviceName, serviceDesc, serviceImage, errors } = formData;

  const serviceOnChange = (e) => {
    // console.log(e);

    setFormData({
        ...formData, [e.target.name]: e.target.value
    });
  };

  const serviceOnSubmit = async (e) => {
    e.preventDefault();
    console.log('Edit Service - Submitting form...');

    const updService = {
        serviceId: id,
        serviceName,
        serviceDesc,
        serviceImage
    }

    dispatch(updateCarService(updService));
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
                    <button type="submit" value="Post Feedback" className="btn btn-lg main-bg-color w-100 btn-color text-light mt-3">Update</button>
                </div>
            </form>
        </section>
    </div>
    )
}

export default EditCarService