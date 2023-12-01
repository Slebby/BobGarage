import { useState } from 'react';
import PropTypes from 'prop-types'
import { FaTrashCan } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../reducer/userSlice';
import { storage } from '../../utils/firebase';
import { deleteObject, ref } from 'firebase/storage';
import Spinner from '../layout/Spinner';

const SingleUser = ({ user }) => {
  const dispatch = useDispatch();
  const [pageIsLoading, setPageIsLoading] = useState(false);

  const userOnDelete = async (id) => {
    console.log('Deleted user clicked');
    console.log(`ID Clicked is ${id}`);

    try {
      setPageIsLoading(true);

      if(user.userImage != null){
        const imageRef = ref(storage, user.userImage);
        await deleteObject(imageRef);
      }

      dispatch(removeUser(id)).unwrap();
    } catch (err) {
      console.log('Failed to delete user', err);
    } finally {
      setPageIsLoading(false);
    }
  }
  return (
    <tr>
        <td>{user.userId}</td>
        <td>{user.username}</td>
        <td className="text-lowercase">{user.email}</td>
        <td>{user.isStaff ? 'Yes' : 'No'}</td>
        <td>{user.userImage ? (
          <img src={user.userImage} alt={`name: ${user.username}`} className="h-auto rounded-circle" style={{objectFit: "cover", width: "5rem", height: "5rem"}}/>
          ) : (
            <img src="defaultPfp/profile-default-dark.svg" alt="defaultPfp" className="h-auto rounded-circle" style={{objectFit: "cover", width: "5rem", height: "5rem"}}/>
            )}
        </td>
        <td>
            <Link className="btn btn-danger ms-3 fw-semibold" onClick={() => {userOnDelete(user.userId)}}>
              <FaTrashCan className="me-2 mb-1"/>Delete
            </Link>
        </td>
        {pageIsLoading && (
          <td>
            <Spinner loadingLabel="Deleting" />
          </td>
        )}
    </tr>
  )
}

SingleUser.propTypes = {
    user: PropTypes.object.isRequired,
}

export default SingleUser