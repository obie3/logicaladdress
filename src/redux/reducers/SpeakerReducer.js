import * as types from '../actions/types';

const initialState = {
    speakers:[],
}
export default function speakerReducer(state = initialState, action) {
    switch(action.type){
        case types.SET_SPEAKERS: 
            return Object.assign({}, state, {
                speakers: action.data,
            });
         default:
            return state;

    }
}