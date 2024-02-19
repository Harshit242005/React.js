// rootReducer.js
import { combineReducers } from 'redux';
import counterReducer from './Reducers/CounterReducer';
counterReducer
const rootReducer = combineReducers({
    counter: counterReducer,

    // Add more reducers as needed
});

export default rootReducer;
