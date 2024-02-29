// rootReducer.js
import { combineReducers } from 'redux';
import counterReducer from './Reducers/CounterReducer';
import authReducer from './Reducers/LoginReducer';
import socketReducer from './Reducers/socketReducer';
import CreateRoom from './Reducers/createRomm';
import existInRoom from './Reducers/ExistInRoom';
import AccessRoom from './Reducers/RoomStatus';
import Member from './Reducers/Member';

const rootReducer = combineReducers({
    counter: counterReducer,
    auth: authReducer,
    socket: socketReducer,
    room: CreateRoom, 
    exist: existInRoom,
    access: AccessRoom,
    memberids: Member,
});

export default rootReducer;
