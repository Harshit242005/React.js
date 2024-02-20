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