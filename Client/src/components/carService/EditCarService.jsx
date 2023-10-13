import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FaAnglesLeft } from 'react-icons/fa6';
import { Consumer } from '../../context/context';
import axios from 'axios';

const EditCarService = () => {
  const [formData, setFormData] = useState({
    serviceName: '',
    serviceDesc: '',
    serviceImage: null
  });

  const { serviceName, serviceDesc, serviceImage } = formData;
  const navigate = useNavigate();
  const { id } = useParams();
//   console.log(id);

  useEffect(() => {
    const getCarService = async (serviceId) => {
        const res = await axios.get(`/api/service/edit/${serviceId}`);
        const item = res.data;
        
        console.log(item);
        setFormData({
            serviceName: item.serviceName,
            serviceDesc: item.serviceDesc,
            serviceImage: item.serviceImage
        });
    };

    getCarService(id);
  }, [id]);

  const serviceOnChange = (e) => {
    // console.log(e);

    setFormData({
        ...formData, [e.target.name]: e.target.value
    });
  };

  const serviceOnSubmit = async (e, dispatch) => {
    e.preventDefault();
    console.log('Edit Service - Submitting form...');

    const updService = {
        serviceId: parseInt(id),
        serviceName,
        serviceDesc,
        serviceImage
    }

    const res = await axios.put(`/api/service/edit/${id}`, updService);
    console.log(res.data);

    dispatch({ type: "UPDATE_SERVICE", payload: updService});
    navigate('/service');
  };

  return (
    <Consumer>
        { value => { const { dispatch } = value 
            return (
            <div className="container mb-5">
                <h3 className="text-center m-4 fw-semibold">Edit Car Service</h3>
                <p>
                    <Link className="link-dark link-underline link-underline-opacity-0 link-opacity-75-hover" to="/service">
                        <FaAnglesLeft className="mb-1 me-1"/>Back
                    </Link>
                </p>
                <section className="card secondary-bg-color border-0">
                    <form onSubmit={e => serviceOnSubmit(e, dispatch)}>
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
        }}
    </Consumer>
  )
}

export default EditCarService