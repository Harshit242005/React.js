// here we would be storing the room access owner value
const initialState = {
    Access: null,
}

const AccessRoom = (state = initialState, action) => {
    switch (action.type) {
        case 'SetAccess':
        return {
            ...state,
            Access: action.payload
        };
        default: {
            return state
        }
    }
}

export default AccessRoom;