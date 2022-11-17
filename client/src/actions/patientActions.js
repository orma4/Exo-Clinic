import axios from 'axios';
import {
GET_DOCTORS,
GET_SINGLE_DOCTOR,
DOCTOR_FILTER,
ADD_DOCUMENT,
ADD_NOTIFICATION
} from './types';
import { setAlert } from './alertActions';
import { tokenConfig } from './authActions';


export const getDoctors = (filterObj) => async(dispatch , getState) => {

  //const approvedUsers = await axios.get('/api/auth/getApprovedDoctors', tokenConfig(getState));
  const doctors = await axios.get('/api/doctors',tokenConfig(getState));
    const approvedArr = [];

    let categoryApprovedArr = [];
    const dispatchArr = (arr) => {
      const sortedArr=arr.sort(function(a, b){
        if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
        if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
        return 0;
    })
      dispatch({
        type: GET_DOCTORS,
        payload: sortedArr
        });
        return 0;
      }


    doctors.data.map(doctor => 
      approvedArr.push(doctor)
  )
  let searchArr=approvedArr;

  if( Object.keys(filterObj).length === 0){
    dispatchArr(approvedArr)
  }


  if(filterObj.name&&filterObj.category ==="All"){
             searchArr = approvedArr.filter(doctor => {
              return doctor.name.toLowerCase().includes(filterObj.name.toLowerCase())
            })   
            dispatchArr(searchArr) 
            return 0;
  }




      if(filterObj.name&&filterObj.category){
        categoryApprovedArr = approvedArr.filter(doctor => {
          return doctor.category === filterObj.category
                 })
                 searchArr = categoryApprovedArr.filter(doctor => {
                  return doctor.name.toLowerCase().includes(filterObj.name.toLowerCase())
                })   
                dispatchArr(searchArr) 
                return 0;
      }
      
        if(filterObj.category){
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
if(filterObj.fee!==undefined||filterObj.exp!==undefined||filterObj.recommendations!==undefined){

  for (const property in filterObj) {

    
    if(property==="fee"){
      searchArr=searchArr.filter(doctor=>{

        return doctor.fee<=filterObj.fee
      })
    }
    if(property==="exp"){
      searchArr=searchArr.filter(doctor=>{
        return doctor.exp>=filterObj.exp
      })

    }   
    if(property==="recommendations"){
      searchArr=searchArr.filter(doctor=>{

        return doctor.recommendations.length >= filterObj.recommendations
      })
    } 
      if(property==="category" && filterObj.category!=='All'){

      searchArr=searchArr.filter(doctor=>{
        return doctor.category === filterObj.category
      })
    } 

  }
    dispatchArr(searchArr)      
}    
  };





export const getSingleDoctor = (id) => async (dispatch , getState) => {
    await axios.get(`/api/doctors/${id}`,tokenConfig(getState))
    .then(res => {
    dispatch({
    type: GET_SINGLE_DOCTOR,
    payload: res.data
    });
    return res.data
    })
    .catch(error => dispatch(setAlert(`${error}`, 'danger')));
};




export const addDocument= (id,documentObj) => (dispatch , getState) => {

  axios.post(`/api/auth/addDocument/${id}`, documentObj, tokenConfig(getState))
    .then(res => 
      {
        dispatch({
        type: ADD_DOCUMENT,
        payload: res.data
    })
    dispatch(setAlert('document created Successfully', 'success'));
  })
    .catch(err =>  dispatch(setAlert(`${err}`, 'danger')));
  };

export const setFilter = (obj) => ({
  type: DOCTOR_FILTER,
  payload: obj,
});

export const addNotification= (notificationObj) => (dispatch , getState) => {

  const {id}=notificationObj
  axios.post(`/api/auth/addNotification/${id}`, notificationObj, tokenConfig(getState))
    .then(res => 
      {
        dispatch({
        type: ADD_NOTIFICATION,
        payload: res.data
    })
    dispatch(setAlert('Notification added Successfully', 'success'));
  })
    .catch(err =>  dispatch(setAlert(`${err}`, 'danger')));
  };