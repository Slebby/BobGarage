import { Link } from 'react-router-dom';
import { FaPen, FaTrashCan } from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { removeCarService } from '../../reducer/carServiceSlice';


const SingleCarService = ({carService}) => {
    const dispatch = useDispatch();
  const { serviceId, serviceName, serviceDesc, serviceImage, servicePrice } = carService;
  const serviceOnDelete = (id) => {
    console.log('Delete Clicked!');
    console.log(`ID: ${id}`);

    try {
        dispatch(removeCarService(id)).unwrap();
    } catch (err) {
        console.log('Failed to delete car Service', err);
    }
  };
    return (
        <div className="card shadow col-md-5 px-0">
            <img src={`${serviceImage !== null ? serviceImage : '#'}`} alt="Picture" className="card-img-top"/>
            <div className="card-body">
                <h3 className="card-title border-bottom pb-2">
                    {serviceName}
                </h3>
                <p className="card-text">
                    {serviceDesc}
                </p>
                <h4 className="card-subtitle mb-3">
                    Price: &#x0024;{servicePrice.toFixed(2)}
                </h4>
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