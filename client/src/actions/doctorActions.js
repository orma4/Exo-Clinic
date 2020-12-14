// import axios from 'axios';
// import {
// ADD_DOCTOR,
// GET_DOCTORS,
// GET_SINGLE_DOCTOR,
// DOCTOR_FILTER,
// GET_APPOINTMENTS,
// IMAGE_CLICKED
// } from './types';
// import { setAlert } from './alertActions';
// import { returnErrors } from './errorActions';
// import { tokenConfig } from './authActions';



// export const submitInfo = ({...doctorData}) => (dispatch , getState) => {
//     axios.post('/api/doctors', doctorData, tokenConfig(getState))
//     .then(res => {
//     dispatch({
//     type: ADD_DOCTOR,
//     payload: res.data
//     });

//     }
//     )
//     .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
// };


// export const clickedImage = ({ imageURL }) => dispatch => {
//     console.log(imageURL);
//     dispatch({
//         type: IMAGE_CLICKED,
//         payload: imageURL
//         });
// };








import axios from 'axios';
import {
ADD_DOCTOR,
GET_DOCTORS,
GET_SINGLE_DOCTOR,
DOCTOR_FILTER,
GET_APPOINTMENTS,
IMAGE_CLICKED,
GET_PATIENTS
} from './types';
import { setAlert } from './alertActions';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';


export const getDoctorPatients = (id) => async(dispatch , getState) => {
    console.log(id)

   const patients = await axios.get(`api/appointments/getDoctorPatients/${id}`,tokenConfig(getState));
   console.log(patients)
       dispatch({
         type: GET_PATIENTS,
         payload: patients.data
         });
   }




export const submitInfo = ({...doctorData}) => (dispatch , getState) => {
    axios.post('/api/doctors', doctorData, tokenConfig(getState))
    .then(res => {
    dispatch({
    type: ADD_DOCTOR,
    payload: res.data
    });

    }
    )
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};


export const clickedImage = ({ imageURL }) => dispatch => {
    console.log(imageURL);
    dispatch({
        type: IMAGE_CLICKED,
        payload: imageURL
        });
};
