

// export default CreateRoom
import { RoomName, existInRoom, accessRoom } from './Action';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import styles from './Styles/InterfaceButtons.module.css';
import useSocket from './useSocket';
import io from 'socket.io-client';

function CreateRoom() {
    // getting the room name from the reducer
    const room_name = useSelector((state) => state.room.roomName);
    // getting some details from the selector
    const accessLevel = useSelector((state) => state.access.Access);
    const exist  = useSelector((state) => state.exist.existInRoom);
    console.log(`room name from reducer is: ${room_name}, room access level is: ${accessLevel}, exist in room status: ${exist}`);

    const [openDialog, setOpenDialog] = useState(false);

    const [roomName, setRoomName] = useState('');
    const { socketId } = useSocket();

    const [error_message, setErrorMessage] = useState('');

    // get the dispatch
    const dispatch = useDispatch();

    const socket_create_room = io('http://localhost:3000');

    useEffect(() => {

        socket_create_room.on('error_on_creating_room', (data) => {
            setErrorMessage(data);
        });

        // setting the room name 
        socket_create_room.on('createdRoom', (data) => {
            console.log('room has been created successfully');
            // add the created room name in redux
            dispatch(RoomName(data));
            // send an another actions call for changing some another scripts to hide the create/join room div
            dispatch(existInRoom(true));
            // pass down the access level
            dispatch(accessRoom('Leader'));
            // on successful room creation hide the dialog to add the name for the 
            setOpenDialog(false)
        });

        return () => {
            socket_create_room.disconnect();
        };
    }, [socket_create_room, dispatch, roomName]);

    const createSocket = () => {
        console.log('creating room', socketId, roomName);
        // Send data directly, not as a callback function
        socket_create_room.emit('createRoom', socketId.toString(), roomName);
    };

    return (
        <div>
            {openDialog &&
                <div>
                    <div>
                        <p>{error_message}</p>
                        <input type="text" placeholder='Type name...' onChange={(e) => setRoomName(e.target.value)} />
                        <button onClick={() => createSocket()}>Create</button>
                        <button onClick={() => setOpenDialog(false)}>Close</button>
                    </div>
                </div>
            }
            <button onClick={() => setOpenDialog(true)} className={styles.interface_room_buttons}>
                Create Room
            </button>
        </div>
    );
}
export default CreateRoom;