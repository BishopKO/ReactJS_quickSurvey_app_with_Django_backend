const initState = {
    loggedIn: false,
};

const rootReducer = (state = initState, action) => {
    console.log(action);
    switch (action.type) {
        case 'LOGIN':
            if (action.payload === 'SUCCESS') {
                return {
                    ...state,
                    loggedIn: true,
                };
            } else {
                return { ...state };
            }

        case 'LOGOUT': {
            return {
                ...state,
                loggedIn: false,
            };
        }
        default:
            return state;
    }
};

export default rootReducer;