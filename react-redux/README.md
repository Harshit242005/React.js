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



- show the room status and hide the join room and create room session 
- an according to access level room either would be destroyed or person would be removed
- all of these actios should be happing in real time 
- while creating the room there should be a the person access level should also be associated with him
- while creating the roowm the access level should be Owner and should be inserted somewhere so i can use it there
 [ so i am calling the redux to store and manage the stage of the ongoing values as auth type ]
- initial state should be passed down to the user account 
- implement join feature in my application to join the room
- implement the show member feature by loading all the member id's in the array object in a reducer so i can render them and get their data using useffect and their status 

Joining room 
we have to emit the added member each time a person changes involves in the members or get out of it so it can reflect in real time 

remove from the room 
- if leader just remove the whole key value pair
- if member remove the member from the members array

- send members list to the front end by sending the emit 
when a person remove the room completely he should be get out and reflect to all the connected members that room has been removed 
use a for loop instead 

currently creating a context for getting the saved members list and showing it off 

- successfully adding the members in the room and reflecting them
- testing the leave/remove room feature in the application
- show each members data from connection members and compare them and reflect them in the change as well

First test out the application and look for possible improvement areas and problems we currently have 

- changing the styles of landing [ solved ] 
- conditional rendering of the leave room causing a gap error on the styles which is not giving us the correct visiuals when user have not joined any room yet  [ solved ]
- change the styles related to the create room for now [ changed ]
- let's look in the Join function and see if it's working correctly or not at the initial start or not 
[ 
- understanding about the emit for members and sending the ids 
]
leave room should also reflect the changes in the ID'S
[
- when room is removed from the active rooms from the leader himeself then we have to cancel the room and remove all the ids from that members array as well 
- we should be implementing a room status to change the status of the room when it's leaved or been removed 
- defining the leave room feature and how it's going to effect it 

question ?
[ 
- how after removing from the room each person would be get reflected from the change that user has been out 
- how the user internal state change would be reflected in the room alos if the user exist in the room 
--- solution
- when user join the room his room name would also get append in the array of the active connections which is storing the chages related to the user state 

]

showing off the user data in the viewable form in the room members get then ids from the state and get data from the mongodb connection 
- the reflection if the member list is not reflecting in the 
