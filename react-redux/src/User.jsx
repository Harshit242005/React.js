// this is your component
import { useSelector } from 'react-redux';
import styles from './Styles/User.module.css'
import { useState, useEffect } from 'react';
// // for loging out of the application
// import { logout } from './Action';
import io from 'socket.io-client';

function User() {
    const userData = useSelector((state) => state.auth.userData);
    console.log(userData);

   

    const [activeUsers, setActiveUsers] = useState([]);
    // Connect to the Socket.IO server
    const socket = io('http://localhost:3000'); 
    const callForEvent = () => {
        socket.emit('testCall');
    }

    socket.on('testCallRece', () => {
        console.log('test call back has been received from server');
    });

    socket.on('activeUsers', (data) => {
        console.log(data);
        setActiveUsers(data);
    });

    
    socket.emit('login', userData.user._id.toString());

    // useEffect(() => {
    //     // Clean up the socket connection on component unmount
    //     return () => {
    //         socket.disconnect();
    //     };
    // }, [socket, userData.user._id]); // Empty dependency array ensures this effect runs only once


    return (
        <div>
            <div>
                {userData ?
                    <div className={styles.userComponent}>
                        <div className={styles.userData}>
                            <div>
                                {/* user image  */}
                                {userData.user.Image && (
                                    <img
                                        className={styles.userImage}
                                        src={`data:image/png;base64, ${userData.user.Image}`}
                                        alt="User Avatar"
                                    />
                                )}
                            </div>
                            {userData.user.Username}
                        </div>
                        <button onClick={callForEvent} className={styles.statusButton}>Active</button>
                    </div>
                    :
                    <div>Not logged in</div>}
            </div>
            {/* here we would be seeing all the other users */}
            <div>
                <h2>Active Users:</h2>
                <ul>
                    {activeUsers.map((user) => (
                        <li key={user.userId}>{user}</li>
                    ))}
                </ul>
            </div>
            {/* {userData && <button onClick={() => {dispatch(logout())}}>Logout</button>}</div> */}
        </div>
    )
}

export default User