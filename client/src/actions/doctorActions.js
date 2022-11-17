import axios from 'axios';
import {
ADD_DOCTOR,
IMAGE_CLICKED,
GET_PATIENTS,
ADD_FEEDBACK,
UPDATE_DOCTOR_DETAILS,
REGISTER_FAIL,
ADD_RECOMMENDATION_SUCCESS
} from './types';
import { setAlert } from './alertActions';
import { returnErrors } from './errorActions';
import { tokenConfig, update, updateDocState } from './authActions';


export const getDoctorPatients = (id) => async(dispatch , getState) => {
  
   const patients = await axios.get(`/api/appointments/getDoctorPatients/${id}`,tokenConfig(getState));

       dispatch({
         type: GET_PATIENTS,
         payload: patients.data
         });
   }

   export const addRecommendation = (id) => async(dispatch,getState) => {
    const {user} =getState().auth
    const body = JSON.stringify({patientId:user.id})
    
      const config = {
          headers: {
              'Content-Type' : 'application/json'
          }
      }
    
       axios.post(`/api/doctors/addRecommendation/${id}`,body,config)
      
      .then(res => {
          dispatch({
          type: ADD_RECOMMENDATION_SUCCESS,
          payload: res.data
      });
     
      
    })
      .catch(err => {
         
          dispatch(returnErrors(err.response.data, err.response.status, 'VERIFY_FAIL'));
          dispatch({
              type: REGISTER_FAIL
          });
      });
    
    };




export const submitInfo = (user,{...doctorData}) => (dispatch , getState) => {
    axios.post('/api/doctors', doctorData, tokenConfig(getState))
    .then(res => {
    dispatch(
    updateDocState(user))
    dispatch({
    type: ADD_DOCTOR,
    payload: res.data
    });

    }
    )
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const updateDoctorDetails = ({...doctorData}) => (dispatch , getState) => {
    axios.post('/api/doctors/updateDoctorDetails', doctorData, tokenConfig(getState))
    .then(res => {
    dispatch(update({image:doctorData.image,
                     name:doctorData.name,
                     phone:doctorData.phone}))
    dispatch({
    type: UPDATE_DOCTOR_DETAILS,
    payload: res.data
    });

    }
    )
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};
export const addDoctorFeedback= (feedbackObj) => (dispatch , getState) => {

const {id}=feedbackObj
axios.post(`/api/doctors/addFeedBack/${id}`, feedbackObj, tokenConfig(getState))
  .then(res => 
    {
      dispatch({
      type: ADD_FEEDBACK,
      payload: res.data
  })
  dispatch(setAlert('Feedback created Successfully', 'success'));
})
  .catch(err =>  dispatch(setAlert(`${err}`, 'danger')));
};

export const clickedImage = ({ imageURL }) => dispatch => {
    dispatch({
        type: IMAGE_CLICKED,
        payload: imageURL
        });
};

