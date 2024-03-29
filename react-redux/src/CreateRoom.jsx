

// export default CreateRoom
import { RoomName, existInRoom } from './Action';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import styles from './Styles/InterfaceButtons.module.css';
import useSocket from './useSocket';
import io from 'socket.io-client';

function CreateRoom() {
    // getting the room name from the reducer
    const room_name = useSelector((state) => state.room.roomName);
   
    const exist  = useSelector((state) => state.exist.existInRoom);
    console.log(`room name from reducer is: ${room_name},exist in room status: ${exist}`);

    const [openDialog, setOpenDialog] = useState(false);

    const [roomName, setRoomName] = useState('');
    const { socketId } = useSocket();

    const [error_message, setErrorMessage] = useState('');

    // get the dispatch
    const dispatch = useDispatch();


    const createSocket = () => {
        const socket_create_room = io('http://localhost:3000');
        //console.log('creating room', socketId, roomName);
        // Send data directly, not as a callback function
        socket_create_room.emit('createRoom', socketId.toString(), roomName);


        // listen for websokcet if the connection is commited
        socket_create_room.on('createdRoom', (data) => {
            //console.log('room has been created successfully');
            // add the created room name in redux
            dispatch(RoomName(data));
            // send an another actions call for changing some another scripts to hide the create/join room div
            dispatch(existInRoom(true));
            
            // on successful room creation hide the dialog to add the name for the 
            setOpenDialog(false);
        });
        

        // listen for if the room creation become unsuccessful
        socket_create_room.on('error_on_creating_room', (data) => {
            setErrorMessage(data);
        });
    };

    return (
        <div>
            {openDialog &&
                <div>
                    <div>
                        <p>{error_message}</p>
                        <input type="text" placeholder='Type name...' 
                        style={{width: '190px', height: '50px', backgroundColor: 'transparent', borderWidth: '0.25px', paddingLeft: '10px'}}
                        onChange={(e) => setRoomName(e.target.value)} />
                        <div style={{display: 'flex', flexDirection: 'row'}}>
                        <button 
                        style={{width: '100px', height: '40px', backgroundColor: 'transparent', borderRadius: '5px', borderWidth: '0.5px',}}
                        onClick={() => createSocket()}>Create</button>
                        <button         
                        style={{width: '100px', height: '40px', backgroundColor: 'transparent', borderRadius: '5px', borderWidth: '0.5px',}}               
                        onClick={() => setOpenDialog(false)}>Close</button>
                        </div>
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