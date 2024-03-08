import { INCREMENT, DECREMENT } from './ActionTypes';

export const incrementAction = () => ({
  type: INCREMENT,
});

export const decrementAction = () => ({
  type: DECREMENT,
});


// auth related actions
export const loginSuccess = (userData) => ({
  type: 'LOGIN_SUCCESS',
  payload: userData,
});

export const loginFailure = () => ({
  type: 'LOGIN_FAILURE',
});

export const logout = () => ({
  type: 'LOGOUT',
});


// listening for the socketId
export const setSocketId = (socketId) => ({
  type: 'SET_SOCKET_ID',
  payload: socketId,
});

// listening for the room name
export const RoomName = (roomName) => ({
  type: 'AddRoom',
  payload: roomName
});



// listening for either room create or joining the room
export const existInRoom = (existRoom) => ({
  type: 'ExistInRoom',
  payload: existRoom
});

// listen for the members 
export const Member = (members) => ({
  type: 'SetMembers',
  payload: members
});