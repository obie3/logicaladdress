import * as types from '../actions/types';

const initialState = {
    program:[],
}
export default function programReducer(state = initialState, action) {
    switch(action.type){
        case types.SET_PROGRAM_DETAILS: 
            return Object.assign({}, state, {
                program: action.data,
            });
         default:
            return state;

    }
}