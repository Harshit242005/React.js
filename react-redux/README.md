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

