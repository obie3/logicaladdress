import * as types from '../actions/types';

const initialState = {
    attendees:[],
}
export default function attendeeReducer(state = initialState, action) {
    switch(action.type){
        case types.SET_ATTENDEES: 
            return Object.assign({}, state, {
                attendees: action.data,
            });
         default:
            return state;

    }
}