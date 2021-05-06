const editReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_QUESTION': {
            let [index, value] = action.payload;
            let tmpState = [...state.questions];
            tmpState[index].question = value;

            return {
                ...state,
                questions: tmpState,
            };
        }
        case 'UPDATE_ANSWERS': {
            let [index, value] = action.payload;
            let tmpState = [...state.questions];
            tmpState[index].answers = value;

            return {
                ...state,
                questions: tmpState,
            };
        }
        case 'UPDATE_TITLE': {
            const title = action.payload;
            return {
                ...state,
                title: title,
            };
        }
        case 'ADD_ANSWERS': {
            let index = action.payload;
            console.log(index);
            let tmpState = [...state.questions];
            tmpState[index].answers = '';
            tmpState[index].type = 'single';
           

            return {
                ...state,
                questions: tmpState,
            };
        }
        case 'SET_ANSWER_TYPE': {
            const { index, type } = action.payload;
            let tmpState = state;
            tmpState.questions[index].type = type;
            console.log(index, type, state);
            return tmpState;
        }

        case 'REMOVE_ANSWERS': {
            let index = action.payload;
            console.log(index);
            let tmpState = [...state.questions];
            delete tmpState[index].answers;

            return {
                ...state,
                questions: tmpState,
            };
        }
        case 'ADD_QUESTION': {
            return {
                ...state,
                questions: [...state.questions, { question: '' }],
            };
        }
        case 'REMOVE_QUESTION': {
            return {
                ...state,
                questions: state.questions.filter((item, index) => {
                    if (index !== action.payload) {
                        return item;
                    } else {
                        return null;
                    }
                }),
            };
        }
        case 'UPDATE_DATA': {
            const data = action.payload;

            return {
                ...data,
            };
        }
        case 'CLEAR': {
            return { title: '', questions: [{ question: '' }] };

        }
        default:
            return state;
    }
};

export default editReducer;