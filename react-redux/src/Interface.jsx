import { useSelector, useDispatch } from 'react-redux';


// for loging out of the application
import { logout } from './Action';

function Interface() {
    const userData = useSelector((state) => state.auth.userData);
    console.log(userData);
    const dispatch = useDispatch();
   
    return (
        <>
        <div>{userData ? `Welcome, ${userData.user.Username}!` : 'Not logged in'}</div>
        {userData && <button onClick={() => {dispatch(logout())}}>Logout</button>}
        </>
    )
}

export default Interface