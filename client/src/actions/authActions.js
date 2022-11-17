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
  UPDATE_PROFILE,
  GET_USERS,
  APPROVE_DOCTOR,
  DELETE_USER,
  SEND_VERIFY_SUCCESS,
  VERIFY_FAIL,
  SEND_OTP_SUCCESS,
  OTP_FAIL,
  READ_NOTIFICATIONS
  
} from './types';
import { setAlert } from './alertActions';

  //Check token & load user
  export const loadUser = () => (dispatch, getState) => {
    const token = tokenConfig(getState);
    //User Loading
    dispatch({type: USER_LOADING});
    

    if(token.headers['x-auth-token']){
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
}
else {
    dispatch({
        type: AUTH_ERROR
    });
}
    
};
//Check token & load user
export const getUsers = () => (dispatch, getState) => {

    axios.get('/api/users', tokenConfig(getState))
    .then(res =>{
        dispatch ({
            type: GET_USERS,
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
                         phone, image, isFirstRegister }) => dispatch => {
    //Headers
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }
    dispatch(checkEmailExists(email));

    //Request body
    const body = JSON.stringify({ name, email, password, userType, isFirstTime, isApproved, phone,
         image, isFirstRegister });
    axios.post('/api/users', body, config)
    .then(res => {
         dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
    })
    localStorage.setItem('isLogged', true);
    return dispatch(verify(email));
})
    .catch(err => {
       
        localStorage.setItem('isLogged', false);
        dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
        dispatch({
            type: REGISTER_FAIL
        });
    });

};
export const userIsExsist = (id) => async (dispatch, getState) => {
    const res=await axios.get(`/api/auth/userIsExsist/${id}`,tokenConfig(getState))
   return   res.data.flag

 };

export const checkEmailExists = ( email ) => dispatch => {
    //Headers
    const config = {
    headers: {
    'Content-Type' : 'application/json'
    }
    }
    //Request body
    const body = JSON.stringify({ email });
    axios.post('/api/users/checkEmailExists', body, config)
    .then(res => {
        })
    .catch(err => {
    dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
    dispatch({
    type: REGISTER_FAIL
    });
    });

};


//send otp to  email
export const otpEmail = (otp) => (dispatch) => {

    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    //Request body
    const body = JSON.stringify({ otp});
    axios.post('/api/users/otpEmail', body, config)
    .then(res => {
        alert(`To delete the user check your email with the OTP`)
        dispatch({
        type: SEND_OTP_SUCCESS,
        payload: res.data
    });
   
    
})
    .catch(err => {
       
        dispatch(returnErrors(err.response.data, err.response.status, 'OTP_FAIL'));
        dispatch({
            type: OTP_FAIL
        });
    });

};

//verify email
export const verify = (email) => (dispatch) => {
    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    //Request body
    const body = JSON.stringify({ email});
    axios.post('/api/users/verify', body, config)
    .then(res => {
        alert(`To verify your account check your email `)
        dispatch({
        type: SEND_VERIFY_SUCCESS,
        payload: res.data
    });
   
    
})
    .catch(err => {
       
        dispatch(returnErrors(err.response.data, err.response.status, 'VERIFY_FAIL'));
        dispatch({
            type: VERIFY_FAIL
        });
    });

};

//verify 
export const postVerify = (token) => (dispatch) => {


    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    axios.post(`/api/users/postverify/${token}`, config)
    .then(res => {
       
})
    .catch(err => {
       
        dispatch(returnErrors(err.response.data, err.response.status, 'VERIFY_FAIL'));
        dispatch({
            type: REGISTER_FAIL//VERIFY_FAIL
        });
    });

};


//forgot user
export const forgot = (email) => (dispatch) => {

    const config = {
        headers: {
            'Content-Type' : 'application/json'
        }
    }

    //Request body
    const body = JSON.stringify({ email});
    axios.post('/api/users/forgot', body, config)
    .then(res => {
         dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
    });
   
    
})
    .catch(err => {
       
        localStorage.setItem('isLogged', false);
        dispatch(returnErrors(err.response.data, err.response.status, 'FORGOT_FAIL'));
        dispatch({
            type: REGISTER_FAIL//FORGOT_FAIL
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
  
   localStorage.setItem('isLogged', true);
})
    .catch(err => {
        dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
     
        localStorage.setItem('isLogged', false);
        dispatch({
            type: LOGIN_FAIL
        }); 
    });
   

};

//Logout user
export const logout = () => {
    
    localStorage.removeItem('isLogged');
    return {
        type: LOGOUT_SUCCESS
    };
};



//updateDocState
export const updateDocState = user => (dispatch , getState) => {
    axios.post('/api/auth/updateDocState', user, tokenConfig(getState))
    .then(res => {
            dispatch({
            type: DOCTOR_REGISTRATION,
            payload: res.data
        });
    
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
 };

//readNotification
export const readNotification = id => (dispatch , getState) => {

    axios.get(`/api/auth/readNotification/${id}`, tokenConfig(getState))
    .then(res => {
            dispatch({
            type: READ_NOTIFICATIONS,
            payload: res.data
        });
    
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
 };

  //deleteNotifications
export const deleteNotifications = id => (dispatch , getState) => {

    axios.delete(`/api/auth/deleteNotifications/${id}`, tokenConfig(getState))
    .then(res => {
            dispatch({
            type: READ_NOTIFICATIONS,
            payload: res.data
        });
    
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
 };


 export const approveDoctor = user => (dispatch , getState) => {
    axios.post('/api/auth/approveDoctor', user, tokenConfig(getState))
    .then(res => {
            dispatch({
            type: APPROVE_DOCTOR,
            payload: res.data
        });
    
    })
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
 };


 export const update = ({...userObj}) => (dispatch,getState) => {
    
    const body = JSON.stringify({...userObj});
    const {id}=userObj
   
    axios.post(`/api/auth/${id}`, body, tokenConfig(getState))
    .then(res => {
         dispatch({
        type: UPDATE_PROFILE,
        payload: res.data
    });
 
    localStorage.setItem('isLogged', true);
})
    .catch(err => dispatch(setAlert(`${err}`, 'danger')));
};
export const deleteUser = ({...userObj}) => (dispatch,getState) => {
    
    const {_id, userType}=userObj
    const body = JSON.stringify({...userObj});

    axios.delete(`/api/auth/deleteUser/${_id}`, tokenConfig(getState))
    .then(res => {
         dispatch({
        type: DELETE_USER,
        payload: res.data
    });
    axios.post(`/api/appointments/deleteUserAppointments/${_id}`, body, tokenConfig(getState));
    
    if(userType==="doctor"){
        axios.delete(`/api/doctors/${_id}`, tokenConfig(getState))

    }
 
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