import * as types from '../actions/types';

const initialState = {
    resources:[],
}
export default function resourceReducer(state = initialState, action) {
    switch(action.type){
        case types.SET_RESOURCES: 
            return Object.assign({}, state, {
                resources: action.data,
            });
         default:
            return state;

    }
}