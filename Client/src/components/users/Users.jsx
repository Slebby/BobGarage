import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers, getUsersStatus, getUsersErrors, fetchUsers } from '../../reducer/userSlice';
import SingleUser from './SingleUser';
import { getIsAuth, getIsStaff } from '../../reducer/authSlice';
import { Navigate } from 'react-router-dom';

const Users = () => {
  const dispatch = useDispatch();
  const isStaff = useSelector(getIsStaff);
  const isAuth = useSelector(getIsAuth);

  if(!isStaff && !isAuth){
    return <Navigate to='/' />
  }

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);


  const userList = useSelector(selectUsers);
  const userStatus = useSelector(getUsersStatus);
  const userError = useSelector(getUsersErrors);

  let content;
  if(userStatus === 'loading'){
    console.log('Loading');
    content = <p>Loading...</p>
  } else if (userStatus === 'succeeded'){
    content = 
    <section className="my-5 container">
        <h2>Users</h2>
        <table className="table table-striped text-center">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Username</th>
                    <th scope="col">Email</th>
                    <th scope="col">Staff</th>
                    <th scope="col">Image</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody className="table-group-divider">
                {
                    userList.map(user => (
                        <SingleUser key={user.userId} user={user}/>
                    ))
                }
            </tbody>
        </table>
    </section>
  } else if (userStatus === 'failed'){
    console.log('Error');
    content = <p>{userError}</p>
  }

  return (
    <Fragment>
        {content}
    </Fragment>
  )
}

export default Users