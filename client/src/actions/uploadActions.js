import axios from 'axios';

import {
ADD_DOCTOR,
GET_DOCTORS,
GET_SINGLE_DOCTOR,
DOCTOR_FILTER,
ADD_UPLOADS,
GET_UPLOADS
} from './types';
import { setAlert } from './alertActions';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';


export const uploadFiles = (onUploadProgress,file) => async (dispatch , getState) => {
    const formData = new FormData();
    formData.append('file', file);
    console.log(file)
    
    const config = {     
        onUploadProgress: progressEvent => onUploadProgress(progressEvent)
    }

    const response = await axios.post('/api/uploads',formData,config)
    .then(res => {
    dispatch({
        type: ADD_UPLOADS,
        payload: res.data
        });
        return res;
        }
        )
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
    console.log(response);

    return response;
};



export const getUserFiles = () => (dispatch , getState) => {
    axios.get('/api/uploads', tokenConfig(getState))
    .then(res => {
    dispatch({
    type: GET_UPLOADS,
    payload: res.data
    });

    console.log(res.data);
    }
    )
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};