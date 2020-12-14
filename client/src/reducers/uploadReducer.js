import {ADD_UPLOADS, GET_UPLOADS} from '../actions/types';

const initialState = {
    userUploads: [],
    loading: false
};

export default function(state = initialState, action){
 switch(action.type){
     case GET_UPLOADS:
         return {
             ...state,
             userUploads: action.payload
         }

    case ADD_UPLOADS:
        return {
            ...state,
            userUploads: [action.payload, ...state.userUploads]
        };

    default:
        return state;
 }   
}