import { useSelector, useDispatch } from 'react-redux';


// for loging out of the application
import { logout } from './Action';
import User from './User';
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';

function Interface() {
    const userData = useSelector((state) => state.auth.userData);
    console.log(userData);
    const dispatch = useDispatch();
   
    return (
        <>
        {/* <div>{userData ? `Welcome, ${userData.user.Username}!` : 'Not logged in'}</div>
        {userData && <button onClick={() => {dispatch(logout())}}>Logout</button>} */}
        <User />

        <div style={{display: 'flex', gap: 20, 'flexDirection': 'row', position: 'relative', top: 100, 'justifyContent': 'center', 'alignContent': 'center', 'alignItems': 'center', 'alignSelf': 'center'}}>
            <CreateRoom />
            <JoinRoom />
        </div>

        </>
        
        
    )
}

export default Interface