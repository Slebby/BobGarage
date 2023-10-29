import { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom';
import SingleCarService from './SingleCarService';
import { FaPlus, FaVolumeHigh } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { selectAllCarServices, getCarServiceStatus, getCarServiceError } from '../../reducer/carServiceSlice';

const CarService = props => {
    const pathLocation = useLocation().pathname;
    const serviceList = useSelector(selectAllCarServices);
    const carServiceStatus = useSelector(getCarServiceStatus);
    const carServiceError = useSelector(getCarServiceError);
    // console.log(pathLocation);
    console.log(serviceList);

    const homePath = pathLocation === '/';

    let content;
    if(carServiceStatus === 'loading'){
        console.log('Loading...');
        content = <p>Loading...</p>
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
                        : (
                            <p className="text-start mx-4">
                                <Link className="link-dark link-underline link-underline-opacity-0 link-opacity-75-hover" to="./add">
                                    <FaPlus className="mb-1 me-1"/>Add
                                </Link>
                            </p>
                        )}
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