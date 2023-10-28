import { Link } from 'react-router-dom';
import { FaPen, FaTrashCan } from 'react-icons/fa6';


const SingleCarService = (props) => {
  const { serviceId, serviceName, serviceDesc, serviceImage } = props.carService;

  const serviceOnDelete = (id) => {
    console.log('Delete Clicked!');
    console.log(`ID: ${id}`);

  };
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
                <Link className="btn main-bg-color btn-color me-3 fw-semibold text-light" to={`./edit/${serviceId}`}>
                    <FaPen className="me-2 mb-1"/>Edit
                </Link>
                <Link className="btn btn-danger ms-3 fw-semibold" onClick={() => serviceOnDelete(serviceId)}>
                    <FaTrashCan className="me-2 mb-1"/>Delete
                </Link>
            </div>
        </div>
    )
}

export default SingleCarService