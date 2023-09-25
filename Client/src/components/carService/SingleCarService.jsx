import { Link } from 'react-router-dom';
import axios from 'axios';
import { Consumer } from '../../context/context';


const SingleCarService = (props) => {
  const { serviceId, serviceName, serviceDesc, serviceImage } = props.carService;

  const serviceOnDelete = (id, dispatch) => {
    console.log('Delete Clicked!');
    console.log(`ID: ${id}`);

    axios.delete(`/api/service/delete/${id}`);
    dispatch({ type: "DELETE_SERVICE", payload: id});
  };
  return (
    <Consumer>
        { value => { const { dispatch } = value
            return (
                <div className="card shadow col-md-5 px-0">
                    <img src={`${serviceImage !== null ? serviceImage : '#'}`} alt="Picture" className="card-img-top"/>
                    <div className="card-body">
                        <h5 className="card-title border-bottom pb-2">
                            {serviceName}
                            </h5>
                        <p className="card-text">
                            {serviceDesc}
                        </p>
                        <Link className="btn main-bg-color btn-color me-3 fw-semibold text-light" to={`./edit/${serviceId}`}>Edit</Link>
                        <Link className="btn btn-danger ms-3 fw-semibold" onClick={() => serviceOnDelete(serviceId, dispatch)}>Delete</Link>
                    </div>
                </div>
            )
        }}
    </Consumer>
  )
}

export default SingleCarService