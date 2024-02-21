// this is your component
import { useSelector, useDispatch } from 'react-redux';
import styles from './Styles/User.module.css'
import { useState, useEffect } from 'react';
// // for loging out of the application
// import { logout } from './Action';
import io from 'socket.io-client';

function User() {
    const userData = useSelector((state) => state.auth.userData);
    console.log(userData);
    // const dispatch = useDispatch();

    const [activeUsers, setActiveUsers] = useState([]);

    useEffect(() => {
        // Connect to the Socket.IO server
        const socket = io('http://localhost:3000'); // Replace with your server's address and port

        // Listen for the 'activeUsers' event
        socket.on('activeUsers', (data) => {
            console.log(`active user data: ${data}`);
            setActiveUsers(data);
        });

        // Clean up the socket connection on component unmount
        return () => {
            socket.disconnect();
        };
    }, []); // Empty dependency array ensures this effect runs only once


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
                        <button className={styles.statusButton}>Active</button>
                    </div>
                    :
                    <div>Not logged in</div>}
            </div>
            {/* here we would be seeing all the other users */}
            <div>
                <h2>Active Users:</h2>
                <ul>
                    {activeUsers.map((user) => (
                        <li key={user.userId}>{user.username}</li>
                    ))}
                </ul>
            </div>
            {/* {userData && <button onClick={() => {dispatch(logout())}}>Logout</button>}</div> */}
        </div>
    )
}

export default User