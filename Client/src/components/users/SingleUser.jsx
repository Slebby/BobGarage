import PropTypes from 'prop-types'
import { FaPen, FaTrashCan } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../reducer/userSlice';

const SingleUser = ({ user }) => {
  const dispatch = useDispatch();

  const userOnDelete = (id) => {
    console.log('Deleted user clicked');
    console.log(`ID Clicked is ${id}`);

    try {
      dispatch(removeUser(id)).unwrap();
    } catch (err) {
      console.log('Failed to delete user', err);
    }
  }
  return (
    <tr>
        <td>{user.userId}</td>
        <td>{user.username}</td>
        <td className="text-lowercase">{user.email}</td>
        <td>{user.isStaff ? 'Yes' : 'No'}</td>
        <td>{user.userImage}</td>
        <td>
            <Link className="btn btn-danger ms-3 fw-semibold" onClick={() => {userOnDelete(user.userId)}}>
              <FaTrashCan className="me-2 mb-1"/>Delete
            </Link>
        </td>
    </tr>
  )
}

SingleUser.propTypes = {
    user: PropTypes.object.isRequired,
}

export default SingleUser