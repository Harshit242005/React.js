const initialState = {
    join_room_name: null,
}

const JoinRoom = (state = initialState, action) => {
    switch (action.type) {
        case 'JoinRoom' :
            return  {
                ...state,
                join_room_name: action.payload
            };
            default:
                return state;
    }

}

export default JoinRoom