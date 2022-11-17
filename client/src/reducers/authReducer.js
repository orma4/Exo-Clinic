import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    DOCTOR_REGISTRATION,
    UPDATE_PROFILE,
    GET_USERS,
    APPROVE_DOCTOR,
    DELETE_USER,
    SEND_VERIFY_SUCCESS,
    VERIFY_FAIL,
  SEND_OTP_SUCCESS,
  OTP_FAIL,
  ADD_DOCUMENT,
  ADD_NOTIFICATION,
  READ_NOTIFICATIONS
  } from '../actions/types';

export const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    otp:false,
    isLoading: false,
    user: null,
    users:null,
    sidebarShow: 'responsive',
    adModal:null

};

const authReducer = (state = initialState, action)=> {
    switch(action.type) {
        case 'set':
            return {...state,sidebarShow:action.sidebarShow}
            case 'OTP_SUCCESS':
                return {
                    ...state,
                    otp:true
                };
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
               
            };
       

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
      
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload.user,
                adModal:true

            };
        case DOCTOR_REGISTRATION:
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };

        
        case UPDATE_PROFILE:
            return {
                    ...state,
                    ...action.payload,
                    isAuthenticated: true,
                    isLoading: false,
                    user: action.payload
                };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null, 
                isAuthenticated: false,
                isLoading: false,
            };
        case ADD_NOTIFICATION: 
            return {...state,users:[...state.users.filter(user=>user._id!==action.payload._id),action.payload]}
        case GET_USERS:
            return {...state,users:action.payload}
        case DELETE_USER: 
            return {...state,users:state.users.filter(user=>user._id!==action.payload._id)}
        case READ_NOTIFICATIONS: 
        return {...state,user:action.payload,users:[...state.users.filter(user=>user._id!==action.payload._id),action.payload]
        }
        case ADD_DOCUMENT:
            return {...state,users:[...state.users.filter(user=>user._id!==action.payload._id),action.payload]
                }
        case "SET_AD_MODAL":
            return {...state,adModal:false}
        case SEND_VERIFY_SUCCESS:
        case VERIFY_FAIL:
        case SEND_OTP_SUCCESS:
        case OTP_FAIL:
        case APPROVE_DOCTOR:      
        default : 
            return state;
    }
}
export default authReducer;