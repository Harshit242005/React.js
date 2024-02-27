import React, { useState } from 'react';
// import {useSelector} from 'react-redux';
import styles from './Styles/InterfaceButtons.module.css';
import useSocket from './useSocket';
import io from 'socket.io-client';
function CreateRoom() {
    const [openDialog, setOpenDialog] = useState(false);
    const [roomName, setRoomName] = useState('');
    const { socketId } = useSocket();
    const [error_message, setErrorMessage] = useState('');

    const createSocket = () => {
        console.log('creating room', socketId, roomName);
        const socket_create_room = io('http://localhost:3000');


        socket_create_room.on('connect', () => {
            socket_create_room.emit('createRoom', (socketId, roomName));

            createSocket.on('error_on_creating_room', (data) => {
                setErrorMessage(data);
            })
        });




    }

    return (
        <div>
            {openDialog &&
                <div>
                    {/* here we can hold the error messages for the user */}
                    <div>
                        <p>{error_message}</p>
                        {/* here would come the room id which creater can copy with a button */}
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
    )
}

export default CreateRoom