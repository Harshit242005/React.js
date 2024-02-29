import React, { useState } from 'react'
import styles from './Styles/InterfaceButtons.module.css';
import { useDispatch } from 'react-redux';
import { accessRoom, existInRoom, RoomName } from './Action';
import { io } from 'socket.io-client';
import useSocket from './useSocket';

function JoinRoom() {
    const join_room = io('http://localhost:3000');
    const [joining_room, setJoiningRoomName] = useState('');
    const { socketId } = useSocket();
    const [openDialog, setOpenDialog] = useState(false);
    const [ error_join_room, setErrorJoinRoom ] = useState('');
    const dispatch = useDispatch();
    const JoinRoom = () => {
        dispatch(accessRoom('Member'));
        dispatch(existInRoom(true));

        join_room.on('connect', () => {
            join_room.on('join_room', (joining_room, socketId));

            join_room.on('joined_room', (room_name) => {
                console.log('successfully joined room', room_name);
                dispatch(RoomName(room_name));
            });

            join_room('error_joining_room', (error_message) => {
                console.log(error_message);
                setErrorJoinRoom(error_message);
            });
        });
    }  

    return (
        <div>
            {openDialog &&
                <div>
                    <p>{error_join_room}</p>
                    <input type="text"
                    onChange={(e) => setJoiningRoomName(e.target.value)}
                     placeholder='Type room name...' />
                    <div>
                        <button onClick={() => JoinRoom()}>Join</button>
                        <button onClick={() => setOpenDialog(false)}>Close</button>
                    </div>
                </div>
            }
            <button onClick={() => setOpenDialog(true)} className={styles.interface_room_buttons}>
                Join Room
            </button>
        </div>
    )
}

export default JoinRoom