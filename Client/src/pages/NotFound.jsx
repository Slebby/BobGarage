import { Link } from 'react-router-dom';
import { FaExclamation } from 'react-icons/fa6';

const NotFound = () => {
  return (
    <section className="container">
        <h1 className="display-3">
            <span className="text-danger">
                <FaExclamation />
            </span>{' '}Oops... Page not found
            <p className="lead">This URL is not exist!</p>
            <Link to="/">Return to home page</Link>
        </h1>
    </section>
  )
}

export default NotFound