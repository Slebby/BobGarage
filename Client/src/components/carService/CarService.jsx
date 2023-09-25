import React from 'react'
import { Link } from 'react-router-dom';
import { Consumer } from '../../context/context';
import SingleCarService from './SingleCarService';

const CarService = props => {
  return (
    <Consumer>
        { value => { const { serviceList } = value
            return (
                <main className="mb-5">
                    <div className="container text-center">
                        <h3 className="m-4 fw-semibold">Check our Services</h3>
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