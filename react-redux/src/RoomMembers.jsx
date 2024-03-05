// import React from 'react';
import useMembers from './useMembers';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { Member } from './Action';
import useSocket from './useSocket';
import useRoom from './useRoom';
import styles from './Styles/RoomMember.module.css';
import axios from 'axios';
function RoomMembers() {
  const dispatch = useDispatch();
  const { socketId } = useSocket();
  const { roomName } = useRoom();

  const { members } = useMembers();
  console.log('members are: ', members);

  const [memberDocId, setMemberDocId] = useState([]);
  const [userDataMap, setUserDataMap] = useState(new Map());


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

    socket.on('members', async (members_ids, activeConnectionObject) => {
      console.log(`directly receving ids from the socket server: ${members_ids}`);
      dispatch(Member(members_ids));

      const newUserDataMap = new Map();
      const usersIds = [];

      if (Symbol.iterator in Object(activeConnectionObject)) {
        // If it's an iterable object, use entries()
        await Promise.all(
          Array.from(activeConnectionObject.entries()).map(async ([memberSocketId, [userId, status, roomname]]) => {
            if (memberSocketId !== socketId && roomname === roomName) {
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
          })
        );
      } else {
        // If it's not iterable, loop through the keys
        for (const memberSocketId of Object.keys(activeConnectionObject)) {
          console.log(memberSocketId);
          console.log(activeConnectionObject[memberSocketId]);
          const [userId, status, roomname] = activeConnectionObject[memberSocketId];

          if (roomname === roomName) {
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
    <div>

      {/* shoowing user data on behalf of the map */}
      {userDataMap.size > 0 ? (
        <div>
          {Array.from(userDataMap.entries()).map(([memberSocketId, [first_user_data, second_user_data]]) => (
            <div key={memberSocketId}>
              {/* Display image and user name */}
              <div className={styles.userStatus}>
                <div className={styles.userData}>
                  <img className={styles.usersImage} src={`data:image/png;base64,${first_user_data.Image}`} alt="User" />
                  <p>{first_user_data.Username}</p>
                </div>
                {/* Display status */}
                <button className={styles.statusButton} disabled>{second_user_data[2]}</button>
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