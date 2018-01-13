import * as Types from '../actions/actionTypes'

function decks(state = {}, action) {
    switch (action.type) {
        case Types.ADD_DECK:
            return {...state, ...action.deck};

        case Types.GET_DECKS:
            return {...state, ...action.decks};

        case Types.ADD_CARD:
            const {title, questions, question, answer} = action.params;
            const newCards = JSON.parse(JSON.stringify(questions)).concat([ { question, answer } ]);
            return {
                ...state,
                [title]: {...state[title], questions: newCards},
            };

        default:
            return state;
    }
}

export default decks;