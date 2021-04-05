const initState = {
    loggedIn: false,
};

const rootReducer = (state = initState, action) => {
    console.log(action);
    switch (action.type) {
        case "LOGIN":
            if (action.payload === "SUCCESS") {
                return {
                    ...state,
                    loggedIn: true,
                }
            }
            break;
        case "LOGOUT":
            if (action.type === "SUCCESS"){
                return {
                    ...state,
                    loggedIn: false,
                }
            }
            break;
        default:
            return state;
    }
};

export default rootReducer;