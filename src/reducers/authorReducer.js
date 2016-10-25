import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state=initialState.authors, actions){
    switch(actions.type){
        case types.LOAD_AUTHORS_SUCCESS:
            return actions.authors;
            
        default: 
            return state;
    }
}