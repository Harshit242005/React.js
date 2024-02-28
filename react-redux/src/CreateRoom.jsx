

// export default CreateRoom
import { RoomName, existInRoom, accessRoom } from './Action';
import { useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import styles from './Styles/InterfaceButtons.module.css';
import useSocket from './useSocket';
import io from 'socket.io-client';

function CreateRoom() {
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
            dispatch(RoomName(data));
            // send an another actions call for changing some another scripts 
            dispatch(existInRoom(true));
            dispatch(accessRoom('Leader'));
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
