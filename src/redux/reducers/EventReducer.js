import * as types from '../actions/types';
const initialState = {
    eventProfile:{},
}
export default function EventReducer(state = initialState, action) {
    switch(action.type){
        case types.SET_EVENT_DETAILS: 
            return Object.assign({}, state, {
                eventProfile: action.data[0],
            });
         default:
            return state;

    }
}
