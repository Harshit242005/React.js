const initialState = {
    socketId: null,
  };
  
  const socketReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_SOCKET_ID':
        return {
          ...state,
          socketId: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default socketReducer;