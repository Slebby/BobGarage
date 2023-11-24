import { Fragment } from 'react'

const Spinner = (props) => {
  return (
    <Fragment>
        <div className="d-flex justify-content-center align-items-center text-light" id="overlay">
            <span className="text-center fs-3 fw-semibold me-3 mb-2" id="loadingOpacity">{props.loadingLabel}</span>
                <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
    </Fragment>
  )
}

export default Spinner