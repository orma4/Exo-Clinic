import {ADD_UPLOADS, GET_UPLOADS} from '../actions/types';

const initialState = {
    userUploads: [],
    loading: false,
    image:'',
    fileName:''
};

export default function(state = initialState, action){
 switch(action.type){
     case GET_UPLOADS:
         return {
             ...state,
             userUploads: action.payload.data
         };

    case ADD_UPLOADS:
        return {
            ...state,
            userUploads: [action.payload.data, ...state.userUploads],
            image:action.payload.data.Location,
            fileName:action.payload.fileName
        };
        case "GET_IMAGE":
            return {
                ...state,
                image:action.payload.data
            };
    default:
        return state;
 }   
}