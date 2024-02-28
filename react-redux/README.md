- we have to add user disconnect feature in the application when user disconnect i would delete the id string from the set
- we should be using useEffect to
- data is not getting reflected when second person connected he would be able to see all the id's before him that are conected but other who are connected before him not been able to do it 
- creating individual rooms and making user join that room on that basis annd providing individual room ids to the users and clinet who would be able to connect to these rooms 

- middlewares
  - use of the middlewares in the project and learning about the use in the function and event call and manuplating the events data before parsing them through

room structure and how the user would going to connect with it and on following type how would he would be let join others this room that he have created 
- create a room and generate a unique room id and save it in a map as a key value pair (key)
structure = 
room_id: [created_person_id, created_at, [ids_of_the_connected_user]]     { this would be stored in the map of active rooms }
person_id: [ room_id, status, joined_at]  { this would be stored in the active pool of the users who are online }

person_id: [ room_id, status, joined_at]  { this would be stored in the active pool of the users who are online }
the followed read me file for the socket.io application
-  running up the updates on the structure of the user id with which is is going to connect

socketIO_ID: [person_id, status, room_id]
in the map we would name it person_id
Initially we would connect with the socket_id: [person_id]
- state would also be managed under the redux for better purposes 

// setActiveUsers(data);
const socketId = useSelector((state) => state.socket.socketId);
- creating a room and hiding all the other data and showing room members 
- UI/Ux design for the select state menagement


let's the user create the room from his name and check if the room is created already exist and if ytes check if this is created by another person or not and if yes then ask for some another name and if not then create the room
structure 
room_name: [creator_id_socket_id, [members_socket_id]]


- after creating the room there should be a different interface 
- room name should be saved in the redux so i can use it anywhere else in my code as well
- create a room action and listen for the change of either create room or join room as well 
- how we would be differenting the joinnes and the ones who have created the room itself
