import axios from 'axios';
import { returnErrors } from './errorActions';
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
} from './types';
import { setAlert } from './alertActions';

  //Check token & load user
  export const loadUser = () => (dispatch, getState) => {
    //User Loading
    dispatch({type: USER_LOADING});

    axios.get('/api/auth/user', tokenConfig(getState))
    .then(res =>{
        dispatch ({
            type: USER_LOADED,
            payload: res.data
        })
    }
         )
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: AUTH_ERROR
        });
    });
    
};

//Register user
export const register = ({ name, email, password, userType, isFirstTime, isApproved,
                         phone, image, recommendations }) => dispatch => {
    //Headers
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    //Request body
    const body = JSON.stringify({ name, email, password, userType, isFirstTime, isApproved, phone, image, recommendations });
    axios.post('/api/users', body, config)
    .then(res => {
         dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
    });
   // localStorage.setItem('user', JSON.stringify(res.data.user));
    localStorage.setItem('isLogged', true);
})
    .catch(err => {
       // localStorage.removeItem('user');
        localStorage.setItem('isLogged', false);
        dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
        dispatch({
            type: REGISTER_FAIL
        });
    });

};




//login user
export const login = ({email,password,userType}) => dispatch => {
    
    //Headers
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    //Request body
    const body = JSON.stringify({email,password, userType});
    axios.post('/api/auth', body, config)
    .then(res => { 
        dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
    });
  // localStorage.setItem('user', JSON.stringify(res.data.user));
   localStorage.setItem('isLogged', true);
})
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
      //  localStorage.removeItem('user');
        localStorage.setItem('isLogged', false);
        dispatch({
            type: LOGIN_FAIL
        }); 
    });
   

};

//Logout user
export const logout = () => {
    //localStorage.removeItem('user');
    localStorage.removeItem('isLogged');
    return {
        type: LOGOUT_SUCCESS
    };
};




export const updateDocState = user => (dispatch , getState) => {
    axios.post('/api/auth/updateDocState', user, tokenConfig(getState))
    .then(res => {
            dispatch({
            type: DOCTOR_REGISTRATION,
            payload: res.data
        });
      //  localStorage.setItem('user', JSON.stringify(res.data));
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
 };




 export const update = ({...userObj}) => (dispatch,getState) => {
    
    const body = JSON.stringify({...userObj});
    const {id}=userObj
    console.log(id)
    console.log(body)
    axios.post(`/api/auth/${id}`, body, tokenConfig(getState))
    .then(res => {
         dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
    });
   // localStorage.setItem('user', JSON.stringify(res.data.user));
    localStorage.setItem('isLogged', true);
})
    .catch(err => dispatch(setAlert(`${err}`, 'danger')));
};

















//Setup config/headers and token
export const tokenConfig = getState => {

      //Get token from localstorage
      const token = getState().auth.token;

      //Headers
      const config = {
          headers: {
              "Content-type" : "application/json"
          }
  
      }
  
      //If token, add to headers
      if(token) {
          config.headers['x-auth-token'] = token;
      }
      
      return config;
}