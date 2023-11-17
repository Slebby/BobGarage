import { Link } from 'react-router-dom';
import { BsExclamationTriangle } from "react-icons/bs";

const NotFound = () => {
  return (
    <section className="container text-center my-5">
        <h1 className="display-3">
            <span className="text-danger d-block">
                <BsExclamationTriangle className="w-50 h-auto"/>
            </span>
            <span>Oops... Page not found</span>
            <p className="fs-1 ">This URL is not exist!</p>
            <Link to="/" className="link-dark link-underline-dark link-underline-opacity-50 link-opacity-75-hover fw-semibold">Return to home page</Link>
        </h1>
    </section>
  )
}

export default NotFound