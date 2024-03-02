// import React from 'react';
import useMembers from './useMembers';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { Member } from './Action';
import useSocket from './useSocket';
import useRoom from './useRoom';
import axios from 'axios';
function RoomMembers() {
  const dispatch = useDispatch();
  const { socketId } = useSocket();
  const { roomName } = useRoom();

  const { members } = useMembers();

  const [memberUserData, setMemberUserData] = useState([]);
  const [memberDocId, setMemberDocId] = useState([]);

  console.log(`members: ${members}`);

  const fetchUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3001/user/${userId}`);
      console.log(response);
      const userData = await response.data;
      return userData;
    }
    catch (error) {
      console.log(`Error while fetching the user data: ${error}`);
    }
  }

  useEffect(() => {
    const socket = io('http://localhost:3000');

    socket.on('members', (members_ids, activeConnectionObject) => {

      console.log(`loading members ids for the room members component directly: ${members_ids}
      and active connection object is: ${activeConnectionObject}`);

      // Destructure the activeConnectionObject
      for (const [memberSocketId, [userId, status, roomname]] of Object.entries(activeConnectionObject)) {
        if (memberSocketId !== socketId && roomname === roomName) {
          // Append the subarray to the memberDocId state
          setMemberDocId(prevState => [
            ...prevState,
            [memberSocketId, userId, status]
          ]);
        }
        console.log(`Socket ID: ${socketId}, User ID: ${userId}, Status: ${status}, Username: ${roomname}`);
      }

      console.log(`member doc id array is: ${memberDocId}`);
      
      dispatch(Member(members_ids));


      // calling for the function to get the user data
      fetchUserDataForMembers();
    });

    // function to fetch the user data for now 
    const fetchUserDataForMembers = async () => {
      console.log('calling for user data fetching function');
      const userDataPromises = memberDocId.map(async ([memberSocketId, userId, status]) => {
        const fetchedData = await fetchUserData(userId);
        return { memberSocketId, userId, status, ...fetchedData };
      });

      const userDataResults = await Promise.all(userDataPromises);
      console.log(`result of the fetched data from the promise is: ${userDataResults}`);
      setMemberUserData(userDataResults);
    };

    

  });

  return (
    <div>
      {/* {memberDocId && memberDocId.length > 0 ? (
        <div>
          {memberDocId}
        </div>
      ) : (
        <p>No one has joined the room yet</p>
      )} */}

      {/* fetching user data from the stored procedure arrays  */}
      {memberUserData && memberUserData.length > 0 ? (
        <div>
          {/* Iterate over userData and display user information */}
          {memberUserData.map((user) => (
            <div key={user.userId}>
              <p>User ID: {user.userId}</p>
              <p>Username: {user.Username}</p>
              <p>Status: {user.status}</p>
             
            </div>
          ))}
        </div>
      ) : (
        <p>No one has joined the room yet</p>
      )}
    </div>
  );
}

export default RoomMembers;
