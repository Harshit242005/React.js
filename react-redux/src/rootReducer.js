// rootReducer.js
import { combineReducers } from 'redux';
import counterReducer from './Reducers/CounterReducer';
import authReducer from './Reducers/LoginReducer';
import socketReducer from './Reducers/socketReducer';
const rootReducer = combineReducers({
    counter: counterReducer,
    auth: authReducer,
    socket: socketReducer
});

export default rootReducer;
