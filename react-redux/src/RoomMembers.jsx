// import React from 'react';
// import useMembers from './useMembers';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
// import { Member } from './Action';
import useSocket from './useSocket';
import useRoom from './useRoom';

import styles from './Styles/RoomMember.module.css';
import axios from 'axios';

function RoomMembers() {
  const dispatch = useDispatch();
  const { socketId } = useSocket();
  const { roomName } = useRoom();
  
  console.log('room name for leader is: ', roomName);


  // const { members } = useMembers();
  // console.log('members are: ', members);

  const [memberDocId, setMemberDocId] = useState([]);
  const [userDataMap, setUserDataMap] = useState(new Map());

  // function to track the styles for the status button of the user
  const getStatusButtonStyle = (status) => {
    switch (status) {
      case 'Active':
        return styles.activeButton;
      case 'Inactive':
        return styles.inactiveButton;
      case 'Break':
        return styles.breakButton;
      default:
        return ''; // Default style or an empty string
    }
  };
  


  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3001/user/${userId}`);
      const userData = response.data;
      const [Username, Image] = userData;
      return { Username, Image }; // Return an object instead of an array
    } catch (error) {
      console.log(`Error while fetching the user data: ${error}`);
      return null; // Handle the error and return null or a default value
    }
  }



  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('members', async (activeConnectionObject) => {
      // console.log(`directly receving ids from the socket server: ${members_ids}`);
      // dispatch(Member(members_ids));

      const newUserDataMap = new Map();
      const usersIds = [];

      if (Symbol.iterator in Object(activeConnectionObject)) {
        // If it's an iterable object, use entries()
        await Promise.all(
          Array.from(activeConnectionObject.entries()).map(async ([memberSocketId, [userId, status, roomname]]) => {
            if (memberSocketId.toString() != socketId.toString() && roomname.toLowerCase() === roomName.toLowerCase()) {
              usersIds.push(userId);

              const second_user_data = [memberSocketId, userId, status];
              const first_user_data = await fetchUserData(userId);

              console.log(`second array data of the user: ${second_user_data}`);
              console.log(`first array user data: ${first_user_data}`);

              // Check if user data is fetched successfully
              if (first_user_data) {
                newUserDataMap.set(memberSocketId, [first_user_data, second_user_data]);
              }
            }
            else {
              console.log(`${memberSocketId} and ${socketId} does match`)
            }
          })
        );
      } else {
        // If it's not iterable, loop through the keys
        for (const memberSocketId of Object.keys(activeConnectionObject)) {
          console.log(memberSocketId, socketId);
          
          const [userId, status, roomname] = activeConnectionObject[memberSocketId];
          console.log(roomname, roomName);
          if (memberSocketId.toString() !== socketId.toString() && roomname.toLowerCase() === roomName.toLowerCase()) {
            console.log('user does not match and writing about that user');
            usersIds.push(memberSocketId);

            const second_user_data = [memberSocketId, userId, status];
            const first_user_data = await fetchUserData(userId);

            console.log(`second array data of the user: ${second_user_data}`);
            console.log(`first array user data: ${first_user_data}`);

            // Check if user data is fetched successfully
            if (first_user_data) {
              newUserDataMap.set(memberSocketId, [first_user_data, second_user_data]);
            }
          }
          else {
            console.log(roomname);
            console.log('not been able to show the user data check for error');
            console.log(`${memberSocketId} and ${socketId} does not match`);
          }
        }
      }

      setMemberDocId(usersIds);
      setUserDataMap(newUserDataMap);
      console.log(`user map structure is this: ${newUserDataMap}`);
      console.log(`member docs ids for mongodb: ${memberDocId}`);
    });
  }, [socketId, roomName, dispatch, memberDocId]);

  return (
    <div className={styles.membersheaD}>
      <p className={styles.roomMember}>Members</p>
      {/* shoowing user data on behalf of the map */}
      {userDataMap.size > 0 ? (
        <div>
          {Array.from(userDataMap.entries()).map(([memberSocketId, [first_user_data, second_user_data]]) => (
            <div key={memberSocketId}>
              <div className={styles.members}>
                {/* Display image and user name */}
                <div className={styles.userStatus}>
                  <div className={styles.userData}>
                    <img className={styles.usersImage} src={`data:image/png;base64,${first_user_data.Image}`} alt="User" />
                    <p>{first_user_data.Username}</p>
                  </div>
                  {/* Display status */}
                  <button className={`${styles.statusButton} ${getStatusButtonStyle(second_user_data[2])}`}
                   disabled>{second_user_data[2]}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No member has joined the room yet!</p>
      )}

    </div>
  );
}
export default RoomMembers;