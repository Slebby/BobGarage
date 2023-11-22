import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPen, FaTrashCan } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { removeCarService } from '../../reducer/carServiceSlice';
import { Fragment } from 'react';
import { getIsAuth, getIsStaff } from '../../reducer/authSlice';
import { storage } from '../../utils/firebase';
import { deleteObject, ref } from 'firebase/storage';
import Spinner from '../layout/Spinner';

const SingleCarService = ({carService}) => {
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);
  const isStaff = useSelector(getIsStaff);
  const { serviceId, serviceName, serviceDesc, serviceImage, servicePrice } = carService;
  const [pageIsLoading, setPageIsLoading] = useState(false);

  const serviceOnDelete = async (id) => {
    console.log('Delete Clicked!');
    console.log(`ID: ${id}`);

    try {
        setPageIsLoading(true);

        if(serviceImage != null){
            const imageRef = ref(storage, serviceImage);
            await deleteObject(imageRef);
        }

        dispatch(removeCarService(id)).unwrap();
    } catch (err) {
        console.log('Failed to delete car Service', err);
    } finally {
        setPageIsLoading(false);
    }
  };
    return (
        <div className="card shadow col-md-5 px-0">
            {pageIsLoading && (
                <Spinner loadingLabel="Deleting" />
            )}
            {serviceImage && (
                <img src={serviceImage} alt="Picture" className="card-img-top"/>
            )}
            <div className="card-body">
                <h3 className="card-title border-bottom pb-2">
                    {serviceName}
                </h3>
                <p className="card-text">
                    {serviceDesc}
                </p>
                <p className="card-subtitle fs-4 fw-semibold mb-3">
                    Price: &#x0024;{servicePrice.toFixed(2)}
                </p>
                {(isAuth && isStaff) && (
                    <Fragment>
                        <Link className="btn main-bg-color btn-color me-3 fw-semibold text-light" to={`./edit/${serviceId}`}>
                            <FaPen className="me-2 mb-1"/>Edit
                        </Link>
                        <Link className="btn btn-danger ms-3 fw-semibold" onClick={() => serviceOnDelete(serviceId)}>
                            <FaTrashCan className="me-2 mb-1"/>Delete
                        </Link>
                    </Fragment>
                )}

            </div>
        </div>
    )
}

export default SingleCarService