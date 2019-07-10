import { CREATE_EVENTS, GET_EVENTS, FIND_EVENT } from '../actions/types';

const initialState = {
    event: {},
    events: []
}

export default function(state = initialState, action) {
    switch(action.type) {
        case CREATE_EVENTS:
            return {
                ...state,
                event: action.payload,
            }
        case GET_EVENTS:
            return {
                ...state,
                events: action.payload,
            }
        case FIND_EVENT:
            return {
                ...state,
                event: action.payload,
            }
        default:
            return state;
    }
}
