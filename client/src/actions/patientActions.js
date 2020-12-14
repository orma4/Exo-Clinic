import axios from 'axios';

import {
ADD_DOCTOR,
GET_DOCTORS,
GET_SINGLE_DOCTOR,
DOCTOR_FILTER
} from './types';
import { setAlert } from './alertActions';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';


export const getDoctors = (filterObj) => async(dispatch , getState) => {

  const approvedUsers = await axios.get('/api/auth/getApprovedDoctors', tokenConfig(getState));
  const doctors = await axios.get('/api/doctors',tokenConfig(getState));
  
    const approvedArr = [];

    let categoryApprovedArr = [];
    let searchArr=[]
    const dispatchArr = (arr) => {
      dispatch({
        type: GET_DOCTORS,
        payload: arr
        });
      }
    doctors.data.map(doctor => 
    approvedUsers.data.map(user => {
    if(user._id === doctor._id)
      approvedArr.push(doctor);
    
  })
  )

      if(filterObj.name&&filterObj.category){
        categoryApprovedArr = approvedArr.filter(doctor => {
          return doctor.category !== filterObj.category
                 })
                 searchArr = categoryApprovedArr.filter(doctor => {
                  return doctor.name.toLowerCase().includes(filterObj.name.toLowerCase())
                })   
                dispatchArr(searchArr) 
      }
      
        if(filterObj.category){
          console.log(filterObj.category)
          if(filterObj.category==='All')
            dispatchArr(approvedArr)
        else{
      categoryApprovedArr=approvedArr.filter(doctor=>{
        return doctor.category === filterObj.category
               })
               dispatchArr(categoryApprovedArr)
        }
      }
       

        if(filterObj.name){
          searchArr=approvedArr.filter(doctor=>{

            return doctor.name.toLowerCase().includes(filterObj.name.toLowerCase())
          })   
          searchArr.sort(function(a,b) {
            return a.name.indexOf(filterObj.name) - b.name.indexOf(filterObj.name);
        });    
          dispatchArr(searchArr)      
        }
       
      
  };





export const getSingleDoctor = (id) => async (dispatch , getState) => {
    const doctor=await axios.get(`/api/doctors/${id}`,tokenConfig(getState))
    .then(res => {
    dispatch({
    type: GET_SINGLE_DOCTOR,
    payload: res.data
    });
    return res.data
    })
    .catch(error => dispatch(setAlert(`${error}`, 'danger')));
};

export const setFilter = (obj) => ({
type: DOCTOR_FILTER,
payload: obj,
});