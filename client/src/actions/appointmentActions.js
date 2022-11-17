import axios from 'axios';
import {
	APPOINTMENT_ERROR,
	CREATE_APPOINTMENT, 
	GET_APPOINTMENTS, 
	ADD_TAKEN_APPOINTMENT,
	DELETE_APPOINTMENT,
	UPDATE_APPOINTMENT,
	GET_APPOINTMENTS_BY_DATE,
	CREATE_REPORT,
	GET_ALL_APPOINTMENTS
} from './types';
import { setAlert } from './alertActions';
import { tokenConfig } from './authActions';
import { addNotification } from './patientActions';


export const updateAppointment = (appointmentObj) => (dispatch, getState) => {
	const { _id } = appointmentObj;
	axios.post(`api/appointments/updateAppointment/${_id}`, appointmentObj, tokenConfig(getState))
	.then(res =>{ 
		if(getState().auth.user.id===appointmentObj.patient.id) 
		dispatch(addNotification({id:appointmentObj.doctor._id,notifyBy:getState().auth.user.id,notification:"update",date:new Date()}))
		else{
		dispatch(addNotification({id:appointmentObj.patient.id,notifyBy:getState().auth.user.id,notification:"update",date:new Date()}))
		}
		dispatch({
		type: UPDATE_APPOINTMENT,
		payload: res.data.appointment
	})
	axios.post('api/doctors/updateTakenAppointment', appointmentObj, tokenConfig(getState))
  .then(res => 
    {
      dispatch({
      type: ADD_TAKEN_APPOINTMENT,
      payload: res.data
  })
  dispatch(setAlert('Add Taken Appointment created Successfully', 'success'));
})
  .catch(err =>  dispatch(setAlert(`${err}`, 'danger')));
}).catch(err => dispatch(setAlert(`${err}`, 'danger')));

};





export const getAllAppointments = () => (dispatch, getState) => {
 axios.get(`/api/appointments/getAllAppointments`, tokenConfig(getState))
 .then(res =>{ 
   dispatch({
	 type: GET_ALL_APPOINTMENTS,
	 payload: res.data
 })}).catch(err => dispatch(setAlert(`${err}`, 'danger')));

};



export const getPatientAppointments = (id) => (dispatch, getState) => {
  axios.get(`/api/appointments/getPatientAppointments/${id}`, tokenConfig(getState))
  .then(res =>{ 
	dispatch({
      type: GET_APPOINTMENTS,
      payload: res.data
  })}).catch(err => dispatch(setAlert(`${err}`, 'danger')));

};


export const getDoctorAppointments = (id) => (dispatch, getState) => {
	 
  axios.get(`/api/appointments/getDoctorAppointments/${id}`, tokenConfig(getState))
  .then(res =>{ 
	dispatch({
      type: GET_APPOINTMENTS,
      payload: res.data
  })}).catch(err => dispatch(setAlert(`${err}`, 'danger')));

};

export const createAppointment = appointmentObj => (dispatch , getState) => {
	
	axios.post('api/appointments/createAppointment', appointmentObj, tokenConfig(getState))
	.then(res => 
	  {
		  if(getState().auth.user.id===appointmentObj.patient.id) 
		  dispatch(addNotification({id:appointmentObj.doctor._id,notifyBy:getState().auth.user.id,notification:"add",date:new Date()}))
		  else{
		  dispatch(addNotification({id:appointmentObj.patient.id,notifyBy:getState().auth.user.id,notification:"add",date:new Date()}))
		  }
		  
		dispatch({
		type: CREATE_APPOINTMENT,
		payload: res.data
	})
	dispatch(setAlert('Appointment created Successfully', 'success'));
	axios.post('api/doctors/addTakenAppointment', {...res.data}, tokenConfig(getState))
	.then(res => 
	  {
		dispatch({
		type: ADD_TAKEN_APPOINTMENT,
		payload: res.data
	})
	dispatch(setAlert('Add Taken Appointment created Successfully', 'success'));
  })
	.catch(err =>  dispatch(setAlert(`${err}`, 'danger')));
  })
	.catch(err =>  dispatch(setAlert(`${err}`, 'danger')));
  };
  

export const deleteAppointment = id => (dispatch, getState) => {
  const appointment= getState().appointment.appointments.find(appointment=>appointment._id===id)

  axios.delete(`api/appointments/delete/${id}`, tokenConfig(getState))
  .then(res =>{
	if(getState().auth.user.id===res.data.appointment.patient.id) 
	dispatch(addNotification({id:res.data.appointment.doctor._id,notifyBy:getState().auth.user.id,notification:"delete",date:new Date()}))
	else{
	dispatch(addNotification({id:res.data.appointment.patient.id,notifyBy:getState().auth.user.id,notification:"delete",date:new Date()}))
	} 
	dispatch({
      type: DELETE_APPOINTMENT,
      payload: id
})})
  .catch(err =>  dispatch(setAlert(`${err}`, 'danger')));

	axios.put('api/doctors/deleteTakenAppointment',appointment, tokenConfig(getState))
	.then(res => 
	{
		dispatch({
		type: ADD_TAKEN_APPOINTMENT,
		payload: res.data
	})
	dispatch(setAlert('Add Taken Appointment created Successfully', 'success'));
	})
	.catch(err =>  dispatch(setAlert(`${err}`, 'danger')));
};


export const appointmentIsExist = (id) => async (dispatch, getState) => {
	const res = await axios.get(`/api/appointments/appointmentIsExist/${id}`,tokenConfig(getState))
   return res.data.flag

 };

//GET ALL APPOINTMENTS BY DATE
export const getAppointmentsByDate = (date = new Date()) => async (dispatch,getState) => {
	
	function convert(date) {
		var dateString = new Date(date.year, date.month-1, date.day);
		let month = dateString.toLocaleString('en-us', { month: 'short' });
	
		return [month,date.day+",",date.year].join(" ");
	}
	try {
		const res = await axios.get(`api/appointments/${convert(date)}`, tokenConfig(getState));
		dispatch({
			type: GET_APPOINTMENTS_BY_DATE,
			payload: res.data
		});
	} catch (error) {  
		if (error.response) {
			dispatch({
				type: APPOINTMENT_ERROR,
				payload: {
					msg: error.response.data,
					status: error.response.data.status,
				},
			});
		}
	}
};


export const makeReport = (appointmentID,report) => async (dispatch,getState) => {
	try {
		const res = await axios.post(`/api/appointments/makeReport/${appointmentID}`,{report},tokenConfig(getState));

		dispatch({
			type: CREATE_REPORT,
			payload: res.data,
		});
		dispatch(setAlert(`Report Created Successfully`, "success"));
	} catch (error) {
		if (error.response) {
			dispatch({
				type: APPOINTMENT_ERROR,
				payload: {
					msg: error.response.data,
					status: error.response.data.status,
				},
			});
		}
	}
};
