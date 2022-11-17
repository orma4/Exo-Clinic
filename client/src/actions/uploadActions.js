import axios from 'axios';

import {
ADD_UPLOADS,

} from './types';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';
import { addDocument } from './patientActions';


export const uploadFiles = (onUploadProgress,file,fileName,closeChat,patientId) => async (dispatch , getState) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const config = {     
        onUploadProgress: progressEvent => onUploadProgress(progressEvent)
    }

    const response = await axios.post('/api/uploads',formData,config)
    .then(res => {
    if(patientId)
    {
        dispatch(addDocument(patientId,{fileName:fileName,document:res.data.Location,docId:getState().auth.user.id,date:new Date()}))
        closeChat();
    }
    dispatch({
        type: ADD_UPLOADS,
        payload: {data:res.data,fileName:fileName}
        });
        return res;
        }
        )
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));

    return response;
};



export const getUserImage = (id) => async (dispatch , getState) => {
    axios.get(`/api/auth/getUserImage/${id}`, tokenConfig(getState))
   
    .then(res => {
    dispatch({
    type: "GET_IMAGE",
    payload: res.data
    });

    }
    )
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};