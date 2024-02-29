const initialState = {
    existInRoom: false,
}

const existInRoom = (state = initialState, action) => {
    switch (action.type) {
        case 'ExistInRoom':
            return {
                ...state,
                existInRoom: action.payload
            };
        default:
            return state;
    }
}


export default existInRoom;