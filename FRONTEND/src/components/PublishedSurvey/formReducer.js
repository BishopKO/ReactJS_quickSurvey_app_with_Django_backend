const formReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case 'SET_INIT_STATE': {
            return {};
        }
        case 'QUESTION_SINGLE': {
            const { question_number, selected } = payload;
            const tmpState = state;
            tmpState[question_number] = selected;
            return { ...tmpState };
        }
        case 'QUESTION_MULTI': {
            const { question_number, selected } = payload;
            console.log(selected);
            const tmpState = state;
            tmpState[question_number] = selected;
            return { ...tmpState };
        }
        case 'QUESTION_TEXT': {
            let tmpState = state;
            const { question_number, value } = payload;
            tmpState[question_number] = value;
            return { ...tmpState };
        }
        default:
            return {
                ...state,
            };
    }
};

export default formReducer;