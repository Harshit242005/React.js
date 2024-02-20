// rootReducer.js
import { combineReducers } from 'redux';
import counterReducer from './Reducers/CounterReducer';
import authReducer from './Reducers/LoginReducer';
const rootReducer = combineReducers({
    counter: counterReducer,
    auth: authReducer,
    
});

export default rootReducer;
