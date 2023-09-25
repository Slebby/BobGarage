import React from 'react'
import { Link } from 'react-router-dom';
import { Consumer } from '../../context/context';
import SingleCarService from './SingleCarService';
import { FaPlus } from 'react-icons/fa6';

const CarService = props => {
  return (
    <Consumer>
        { value => { const { serviceList } = value
            return (
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
                                serviceList.map( service => (
                                    <SingleCarService key={service.serviceId} carService={service}/>
                                ))
                            }
                        </div>
                    </div>
                </main>
            )
        }}
    </Consumer>
  )
}

CarService.propTypes = {}

export default CarService