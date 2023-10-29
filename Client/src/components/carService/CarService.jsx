import { Fragment } from 'react'
import { Link } from 'react-router-dom';
import SingleCarService from './SingleCarService';
import { FaPlus, FaVolumeHigh } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { selectAllCarServices, getCarServiceStatus, getCarServiceError } from '../../reducer/carServiceSlice';

const CarService = props => {
    const serviceList = useSelector(selectAllCarServices);
    const carServiceStatus = useSelector(getCarServiceStatus);
    const carServiceError = useSelector(getCarServiceError);

    console.log(serviceList);

    let content;
    if(carServiceStatus === 'loading'){
        console.log('Loading...');
        content = <p>Loading...</p>
    } else if (carServiceStatus === 'succeeded'){
        console.log('Success!');
        content = 
            <main className="mb-5">
                <div className="container text-center">
                    <h3 className="m-4 fw-semibold">Our Services</h3>
                    <p className="text-start mx-4">
                        <Link className="link-dark link-underline link-underline-opacity-0 link-opacity-75-hover" to="./add">
                            <FaPlus className="mb-1 me-1"/>Add
                        </Link>
                    </p>
                    <div className="row row-cols-2 gap-5 justify-content-center">
                        {
                            serviceList.map( item => (
                                <SingleCarService key={item.serviceId} carService={item}/>
                            ))
                        }
                    </div>
                </div>
            </main>
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