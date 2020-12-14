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
    UPDATE_PROFILE
  } from '../actions/types';

export const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
};

export default function(state = initialState, action) {
    switch(action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
           // if(action.payload){
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
               
            }
  
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
      
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload.user
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
        default: 
            return state;
    }
}