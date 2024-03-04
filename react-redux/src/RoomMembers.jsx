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
  const user_data_map = new Map();
  // const [memberUserData, setMemberUserData] = useState([]);


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
      // dispatching the ids for the members actions
      dispatch(Member(members_ids));


      console.log(`loading members ids for the room members component directly: ${members_ids}
      and active connection object is: ${activeConnectionObject}`);

      // to store the user doc id's from the mongodatabase document
      const userDocIds = [];
      // Destructure the activeConnectionObject
      for (const [memberSocketId, [userId, status, roomname]] of Object.entries(activeConnectionObject)) {
        if (memberSocketId !== socketId && roomname === roomName) {
          // Append the subarray to the memberDocId state
          userDocIds.push(userId);
          // directly save the details in the map with the fetching of it's data 
          const second_user_data = [memberSocketId, userId, status];
          
          const first_user_data = fetchUserData(userId);
          // adding the member in the user map
          user_data_map[memberSocketId] = [first_user_data, second_user_data];
          console.log(user_data_map);
        }
        console.log(`Socket ID: ${socketId}, User ID: ${userId}, Status: ${status}, Username: ${roomname}`);
      }
      // set the user doc id's in the useState empty array
      setMemberDocId(userDocIds);
      console.log(`member doc id array is: ${memberDocId}`);
      // calling for the function to get the user data
      // fetchUserDataForMembers();
    });

    // // function to fetch the user data for now 
    // const fetchUserDataForMembers = async () => {
    //   console.log('calling for user data fetching function');
    //   const userDataPromises = memberDocId.map(async ([memberSocketId, userId, status]) => {
    //     const fetchedData = await fetchUserData(userId);
    //     return { memberSocketId, userId, status, ...fetchedData };
    //   });

    //   const userDataResults = await Promise.all(userDataPromises);
    //   console.log(`result of the fetched data from the promise is: ${userDataResults}`);
    //   setMemberUserData(userDataResults);
    // };
  });

  return (
    <div>
      

      {/* fetching user data from the stored procedure arrays  */}
      {/* {memberUserData && memberUserData.length > 0 ? (
        <div>
          
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
      )} */}


      {/* shoowing user data on behalf of the map */}
      {Array.from(user_data_map.entries()).map(([memberSocketId, [first_user_data, second_user_data]]) => (
        <div key={memberSocketId}>
          {/* Display image and user name */}
          <img src={first_user_data.image} alt="User" />
          <p>{first_user_data.user_name}</p>
          
          {/* Display status */}
          <p>Status: {second_user_data.status}</p>
        </div>
      ))}

      
    </div>
  );
}

export default RoomMembers;
