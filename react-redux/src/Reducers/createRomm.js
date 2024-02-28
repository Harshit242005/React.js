// creating reducer to store the user created room name 
const initialState = {
    roomName: null,
    
};

// creating the root reducer 
const CreateRoom = (state = initialState, action) => {
    switch (action.type) {
        case 'AddRoom':
            return {
                ...state,
                roomName: action.payload
            };
        default:
            return state;
    }
}

export default CreateRoom;