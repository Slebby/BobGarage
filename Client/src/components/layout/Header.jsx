import { Fragment } from 'react'
import PropTypes from 'prop-types';
import { Link, useLocation, NavLink } from 'react-router-dom';
import { FaScrewdriverWrench, FaComments, FaMicroblog, FaCircleInfo, FaArrowRightToBracket, FaPersonChalkboard, FaPersonWalkingDashedLineArrowRight, FaPerson } from 'react-icons/fa6';
import { BsPersonCircle } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import { getAuthUserImage, getAuthUserUsername, getIsAuth, getIsStaff, logout } from '../../reducer/authSlice';
import Switch from './Switch';

const Header = props => {
  const pathLocation = useLocation().pathname;
  // console.log(pathLocation);
  const dispatch = useDispatch();
  const isAuth = useSelector(getIsAuth);
  const isStaff = useSelector(getIsStaff);
  const authUsername = useSelector(getAuthUserUsername);
  const authUserImage = useSelector(getAuthUserImage);

  const leave = e => {
    console.log('Leave click');

    dispatch(logout());
  }

  const staffLinks = (
    <Fragment key={'1'}>
        <li className="nav-item">
            <Link className={`nav-link ${pathLocation === '/users' ? 'active' : ''}`} to="/users">
                <FaPerson className="me-2 mb-1"/>Users
            </Link>
        </li>
    </Fragment>
  );

  const authLink = (
    <Fragment key={'2'}>
        <li className="nav-item">

        </li>
    </Fragment>
  );

  const loginRegisterLinks = (
    <Fragment key={'3'}>
        <li className="nav-item">
            <Link className={`nav-link ${pathLocation === '/login' ? 'active' : ''}`} to="/login">
                <FaArrowRightToBracket className="me-2 mb-1"/>Login
            </Link>
        </li>
        <li className="nav-item">
            <Link className={`nav-link ${pathLocation === '/register' ? 'active' : ''}`} to="/register">
                <FaPersonChalkboard className="me-2 mb-1"/>Sign Up
            </Link>
        </li>
    </Fragment>
  );

  const logoutLink = (
      <Fragment key={'4'}>
        <li className="nav-item">
            <NavLink onClick={e => leave(e)} className="nav-link" to="/login">
                <FaPersonWalkingDashedLineArrowRight className="me-2 mb-1"/>Sign out
            </NavLink>
        </li>
    </Fragment>
  );

  const userName = (
    <Fragment key={'5'}>
        <li className="nav-item">
            <Link className="nav-link text-center">
                {authUserImage ? (
                    <img src={authUserImage} alt={`name: ${authUsername}`} className="d-block mx-auto mb-1 rounded-circle" style={{objectFit: "cover", width: "47px", height: "47px"}}/>
                ) : (
                    <img src="defaultPfp/profile-default-white.svg" alt="defaultPfp" className="d-block mx-auto mb-1 rounded-circle" style={{objectFit: "cover", width: "47px", height: "47px"}}/>
                )}
                {authUsername}
            </Link>
        </li>
    </Fragment>
  );

  return (
    <header>
        <nav className="navbar navbar-expand-lg main-bg-color" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" style={{width: "8rem"}} to="/">
                    <img src="BobGarageLogo.png" alt="Bob Garage Logo" className="d-inline-block align-text-top w-100"/>
                    {/* {props.branding} */}
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-center fs-5">
                        <li className="nav-item">
                            <Link className={`nav-link ${pathLocation.includes('/service') ? 'active' : ''}`} to="/service">
                                <FaScrewdriverWrench className="me-2 mb-1"/>Services
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${pathLocation.includes('/feedback') ? 'active' : ''}`} to="/feedback">
                                <FaComments className="me-2 mb-1"/>Feedback
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${pathLocation.includes('/blog') ? 'active' : ''}`} to="/blog">
                                <FaMicroblog className="me-2 mb-1"/>Blog
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${pathLocation === '/about' ? 'active' : ''}`} to="/about">
                                <FaCircleInfo className="me-2 mb-1"/>About
                            </Link>
                        </li>
                        { isAuth && isStaff ? staffLinks : null }
                        { isAuth ? [logoutLink, userName] : loginRegisterLinks }
                        <li className="nav-item">
                            <div className="nav-text mt-1">
                                <Switch />
                            </div>
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