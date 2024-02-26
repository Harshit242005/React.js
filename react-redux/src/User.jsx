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
    const [ showOptions ,setShowOptions] = useState(false);
    const [ currentState, setCurrentState ] = useState('');

   

    // const [activeUsers, setActiveUsers] = useState([]);
    

    useEffect(() => {
        // Connect to the Socket.IO server
        const socket = io('http://localhost:3000');

        // Emit login event
        socket.emit('login', userData.user._id.toString());

        // Event listeners
        socket.on('testCallRece', () => {
            console.log('test call back has been received from server');
        });

        

        socket.on('activeUsers', (data) => {
            console.log(data);
            // setActiveUsers(data);
        });



        // Clean up the socket connection on component unmount
        return () => {
            socket.disconnect();
        };
    }, [userData.user._id]); // Dependency ensures this effect runs only once on mount

    


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
                        <button onClick={() => setShowOptions(true)} className={styles.statusButton}>{currentState}</button>
                    </div>
                    :
                    <div>Not logged in</div>}
            </div>

            {
                showOptions && 
                <div>
                    <p>Select current state</p>
                <div>
                    <button onClick={() => setCurrentState('Active')}>Active</button>
                    <button onClick={() => setCurrentState('Inactive')}>inactive</button>
                    <button onClick={() => setCurrentState('Break')}>Break</button>
                   
                </div>
                </div>
            }


            {/* here we would be seeing all the other users */}
            {/* <div>
                <h2>Active Users:</h2>
                <ul>
                    {activeUsers.map((user) => (
                        <li key={user.userId}>{user}</li>
                    ))}
                </ul>
            </div> */}
            {/* {userData && <button onClick={() => {dispatch(logout())}}>Logout</button>}</div> */}
        </div>
    )
}

export default User