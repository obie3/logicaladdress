import * as types from '../actions/types';
const initialState = {
    sponsorProfile:[],
}
export default function sponsorReducer(state = initialState, action) {
    switch(action.type){
        case types.SET_SPONSOR_DETAILS: 
            return Object.assign({}, state, {
                sponsorProfile: action.data,
            });
         default:
            return state;

    }
}