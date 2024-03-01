// reducer for member 
const initialState = {
    members: null,
}

const SetMembers = (state = initialState, action) => {
    switch (action.type) {
        case 'SetMembers' :
        return {
            ...state,
            members: action.payload
        };

        default: {
            return state
        }
    }
}

export default SetMembers;