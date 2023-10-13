import { Link } from 'react-router-dom';
import { RiPhoneLine, RiMailLine, RiFacebookBoxLine, RiTwitterLine, RiInstagramLine, RiLinkedinBoxLine, RiYoutubeLine } from 'react-icons/ri';

const Footer = props => {
    const date = new Date();
  return (
    <footer className="mt-auto main-bg-color text-white py-3">
        <div className="row text-center">
          <div className="col px-0 border-end border-light" style={{"--bs-border-opacity": ".6"}}>
            <span className="d-block fs-5 mb-1">
              <RiPhoneLine className="icon-size-small text-white img-fluid mb-1"/>: 1234567890
            </span>
            <span className="d-block fs-5">
              <RiMailLine className="icon-size-small text-white img-fluid mb-1"/>: name@example.com
            </span>
          </div>
          <div className="col px-0">
            <span className="fs-4 mb-0 d-block">Follow Us</span>
            <Link>
              <RiFacebookBoxLine className="icon-size text-white img-fluid"/>
            </Link>
            <Link>
              <RiTwitterLine className="icon-size text-white img-fluid"/>
            </Link>
            <Link>
              <RiInstagramLine className="icon-size text-white img-fluid"/>
            </Link>
            <Link>
              <RiLinkedinBoxLine className="icon-size text-white img-fluid"/>
            </Link>
            <Link>
              <RiYoutubeLine className="icon-size text-white img-fluid"/>
            </Link>
          </div>
        </div>
        <div className="row my-3">
          <p className="mx-3 mb-0">
            Copyright {String.fromCharCode(169)} {date.getFullYear()} Websites &apos;r&apos; us
          </p>
        </div>
    </footer>
  )
}

Footer.propTypes = {}

export default Footer