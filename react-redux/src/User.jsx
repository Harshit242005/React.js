// this is your component
import { useSelector, useDispatch } from 'react-redux';
import styles from './Styles/User.module.css'
import { useState, useEffect } from 'react';
import { setSocketId, existInRoom } from './Action';
// // for loging out of the application
// import { logout } from './Action';
import io from 'socket.io-client';
import useSocket from './useSocket';
import useRoom from './useRoom';

function User() {
    const userData = useSelector((state) => state.auth.userData);
    const exist = useSelector((state) => state.exist.existInRoom);
    console.log(userData);
    const { socketId } = useSocket();
    const { roomName } = useRoom();
    const [showOptions, setShowOptions] = useState(false);
    const [currentState, setCurrentState] = useState('');
    const dispatch = useDispatch();


    // leave room function 
    const LeaveRoom = () => {
        //  send the actions for deleting the room
        dispatch(LeaveRoom(false));

        const remove_room = io('http://localhost:3000');
        // connect with server
        remove_room.om('connect', () => {
            // send room name and socket id
            console.log(`removing from room socket id is: ${socketId} and room name is: ${roomName}`);
            remove_room.emit('remove_room', (socketId, roomName));
        });
    }

    const setActivityState = (activity) => {
        console.log(`current state: ${activity}`);
        setCurrentState(activity);

       
        console.log(`socket id for connection is: ${socketId}`);
        const change_state_socket = io('http://localhost:3000');
        change_state_socket.on('connect', () => {
            // emit the state for the changes 
            change_state_socket.emit('changeState', socketId, activity);
        });
        setShowOptions(false);
    }


    useEffect(() => {
        // Connect to the Socket.IO server
        const socket = io('http://localhost:3000');

        // Listen for the 'connect' event
        socket.on('connect', () => {
            // Now, socket.id is available
            const socketId = socket.id;
            console.log('connected user id: ', socketId);
            // calling for the actions to set the id for the actions
            dispatch(setSocketId(socketId));

            // Emit login event
            socket.emit('login', socketId, userData.user._id.toString());
        });

        socket.on('activeUsers', (data) => {
            console.log(data);


        });

        // Clean up the socket connection on component unmount
        return () => {
            socket.disconnect();
        };
    }, [userData.user._id, dispatch]); // Dependency ensures this effect runs only once on mount





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
                        <div>
                            {exist && 
                            <button onClick={LeaveRoom}>Leave</button>
                            }
                            {/* give button to leave the current room */}
                        <button onClick={() => setShowOptions(true)} className={styles.statusButton}>{currentState}</button>
                        </div>
                    </div>
                    :
                    <div>Not logged in</div>}
            </div>

            {
                showOptions &&
                <div className={styles.selectState}>
                    <p>Select current state</p>
                    <div className={styles.stateButtons}>
                        <button onClick={() => setActivityState('Active')}>Active</button>
                        <button onClick={() => setActivityState('Inactive')}>inactive</button>
                        <button onClick={() => setActivityState('Break')}>Break</button>
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