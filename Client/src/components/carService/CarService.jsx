import { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom';
import SingleCarService from './SingleCarService';
import { FaPlus, FaVolumeHigh } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { selectAllCarServices, getCarServiceStatus, getCarServiceError } from '../../reducer/carServiceSlice';
import { getIsAuth, getIsStaff } from '../../reducer/authSlice';
import Spinner from '../layout/Spinner';

const CarService = props => {
    const pathLocation = useLocation().pathname;
    const serviceList = useSelector(selectAllCarServices);
    const carServiceStatus = useSelector(getCarServiceStatus);
    const carServiceError = useSelector(getCarServiceError);
    const isAuth = useSelector(getIsAuth);
    const isStaff = useSelector(getIsStaff);
    // console.log(pathLocation);
    console.log(serviceList);

    const homePath = pathLocation === '/';

    let content;
    if(carServiceStatus === 'loading'){
        console.log('Loading...');
        content = <Spinner loadingLabel="Loading"/>
    } else if (carServiceStatus === 'succeeded'){
        console.log('Success!');
        content = 
            <section className="mb-5">
                <div className="container text-center">
                    <h3 className="m-4 fw-semibold">
                        {homePath ? (
                            <Link to='/service' className="link-dark link-underline link-underline-opacity-0 link-opacity-75-hover fw-semibold">
                                Check our Services
                            </Link>
                        ) : 'Our Services'}
                    </h3>
                        {homePath ? ''
                        : (isAuth && isStaff) ? (
                            <div className="text-start m-4">
                                <span>
                                    <Link className="link-dark link-underline link-underline-opacity-0 link-opacity-75-hover" to="./add">
                                        <FaPlus className="mb-1 me-1"/>Add
                                    </Link>
                                </span>
                                <div className="dropdown float-end">
                                    <button className="btn main-bg-color btn-color text-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Sort By
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <Link className="dropdown-item">Newest</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item">Oldest</Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) : null}
                    <div className="row row-cols-2 gap-5 justify-content-center">
                        {
                            serviceList.map( item => (
                                <SingleCarService key={item.serviceId} carService={item}/>
                            ))
                        }
                    </div>
                </div>
            </section>
    } else if (carServiceStatus === 'failed'){
        console.log('Error');
        content = <p>{carServiceError}</p>
    }

    return (
        <Fragment>
            {content}
        </Fragment>
    )
}

CarService.propTypes = {}

export default CarService