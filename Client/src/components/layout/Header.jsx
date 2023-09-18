import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

const Header = props => {
  return (
    <header>
        <nav className="navbar navbar-expand-lg nav-bg-color" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">{props.branding}</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" aria-current="page" to="#">Services</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Feedback</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Blog</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="#">Sign Up</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
  )
}

Header.defaultProps = {
    branding: 'My App',
}

Header.propTypes = {
    branding: PropTypes.string,
}

export default Header