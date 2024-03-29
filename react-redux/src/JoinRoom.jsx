import  { useState } from 'react'
import styles from './Styles/InterfaceButtons.module.css';
import { useDispatch } from 'react-redux';
import { existInRoom, RoomName } from './Action';
import { io } from 'socket.io-client';
import useSocket from './useSocket';

function JoinRoom() {
    
    const [joining_room, setJoiningRoomName] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [ error_join_room, setErrorJoinRoom ] = useState('');

    const dispatch = useDispatch();
    const { socketId } = useSocket();
    const JoinRoom = () => {

        const join_room = io('http://localhost:3000');
        

        join_room.on('connect', () => {
            //console.log(`joining room is: ${joining_room} and socket id: ${socketId}`);
            
            join_room.emit('joining_room', joining_room, socketId.toString());

            join_room.on('joined_room', (room_name) => {
                console.log('successfully joined room', room_name);
                // sending some dispatch functions 
                dispatch(RoomName(room_name));
             
                dispatch(existInRoom(true));
            });

            join_room.on('error_joining_room', (error_message) => {
                //console.log(error_message);
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
                     style={{width: '190px', height: '50px', backgroundColor: 'transparent', borderWidth: '0.25px', paddingLeft: '10px'}}
                    onChange={(e) => setJoiningRoomName(e.target.value)}
                     placeholder='Type room name...' />
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <button 
                        style={{width: '100px', height: '40px', backgroundColor: 'transparent', borderRadius: '5px', borderWidth: '0.5px',}}
                        onClick={() => JoinRoom()}>Join</button>
                        <button
                        style={{width: '100px', height: '40px', backgroundColor: 'transparent', borderRadius: '5px', borderWidth: '0.5px',}}
                        onClick={() => setOpenDialog(false)}>Close</button>
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