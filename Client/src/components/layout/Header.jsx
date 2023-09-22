import React from 'react'
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

const Header = props => {
  const pathLocation = useLocation().pathname;
//   console.log(pathLocation);
  return (
    <header>
        <nav className="navbar navbar-expand-lg main-bg-color" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src="BobGarageLogo.png" alt="Bob Garage Logo" className="d-inline-block align-text-top" style={{width: "40%"}}/>
                    {/* {props.branding} */}
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${pathLocation === '/service' ? 'active' : ''}`} to="/service">Services</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${pathLocation === '/feedback' || pathLocation === '/feedback/add' ? 'active' : ''}`} to="/feedback">Feedback</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${pathLocation === '/blog' || pathLocation === '/blog/add' ? 'active' : ''}`} to="/blog">Blog</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${pathLocation === '/about' ? 'active' : ''}`} to="/about">About</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${pathLocation === '/login' ? 'active' : ''}`} to="/login">Login</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${pathLocation === '/register' ? 'active' : ''}`} to="/register">Sign Up</Link>
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