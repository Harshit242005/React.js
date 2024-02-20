// login reducer
const initialState = {
    isAuthenticated: false,
    userData: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            console.log('user logged in successfully');
            return {
                ...state,
                isAuthenticated: true,
                userData: action.payload,
            };

        case 'LOGIN_FAILURE':
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                userData: null,
            };

        default:
            return state;
    }
};

export default authReducer;
