import axios from 'axios';
import {
	APPOINTMENT_ERROR,
	UPDATE_APPOINTMENT_STATUS,
	GET_STATUS_COUNT,
	CREATE_PRESCRIPTION,
	UPDATE_MEDICINE, 
	CREATE_APPOINTMENT, 
	GET_APPOINTMENTS, 
	DELETE_APPOINTMENT,
	UPDATE_APPOINTMENT_PRESCRIPTION,
	UPDATE_APPOINTMENT,
	GET_APPOINTMENTS_BY_DATE
} from './types';
import { setAlert } from './alertActions';
import { tokenConfig } from './authActions';
import { da } from 'date-fns/locale';


export const updateAppointment = (appointmentObj) => (dispatch, getState) => {
	const { _id } = appointmentObj;
	console.log(appointmentObj)
	axios.post(`api/appointments/updateAppointment/${_id}`, appointmentObj, tokenConfig(getState))
	.then(res =>{ 
		console.log(res.data)  
	dispatch({
		type: UPDATE_APPOINTMENT,
		payload: res.data
	})}).catch(err => dispatch(setAlert(`${err}`, 'danger')));
};



export const getPatientAppointments = (id) => (dispatch, getState) => {
	 console.log(id)
  axios.get(`api/appointments/getPatientAppointments/${id}`, tokenConfig(getState))
  .then(res =>{ 
	 console.log(res.data)  
	dispatch({
      type: GET_APPOINTMENTS,
      payload: res.data
  })}).catch(err => dispatch(setAlert(`${err}`, 'danger')));

};


export const getDoctorAppointments = (id) => (dispatch, getState) => {
	 
  axios.get(`api/appointments/getDoctorAppointments/${id}`, tokenConfig(getState))
  .then(res =>{ 
	// console.log(res.data)  
	dispatch({
      type: GET_APPOINTMENTS,
      payload: res.data
  })}).catch(err => dispatch(setAlert(`${err}`, 'danger')));

};

export const createAppointment = appointmentObj => (dispatch , getState) => {
  console.log(appointmentObj);
  axios.post('api/appointments/createAppointment', appointmentObj, tokenConfig(getState))
  .then(res => 
    {
      dispatch({
      type: CREATE_APPOINTMENT,
      payload: res.data
  })
  dispatch(setAlert('Appointment created Successfully', 'success'));
})
  .catch(err =>  dispatch(setAlert(`${err}`, 'danger')));
};


export const deleteAppointment = id => (dispatch, getState) => {
  console.log(id);
  axios.delete(`api/appointments/delete/${id}`, tokenConfig(getState))
  .then(res => dispatch({
      type: DELETE_APPOINTMENT,
      payload: id
  }))
  .catch(err =>  dispatch(setAlert(`${err}`, 'danger')));
};

export const updateAppointmentPrescription = appointmentObj => (dispatch , getState) => {
  console.log(appointmentObj);
  axios.post('api/appointments/updateAppointmentPrescription', appointmentObj, tokenConfig(getState))
  .then(res => 
    {
      dispatch({
      type: UPDATE_APPOINTMENT_PRESCRIPTION,
      payload: res.data
  })
  dispatch(setAlert('Appointment created Successfully', 'success'));
})
  .catch(err =>  dispatch(setAlert(`${err}`, 'danger')));
};


//////////////////////////////////////////////
//GET ALL APPOINTMENTS BY DATE
export const getAppointmentsByDate = (date = new Date()) => async (dispatch,getState) => {
	
	function convert(date) {
		var dateString = new Date(date.year, date.month-1, date.day);
		let month = dateString.toLocaleString('en-us', { month: 'short' });
	
		// console.log(month)
		return [month,date.day+",",date.year].join(" ");
	}
	try {
		const res = await axios.get(`api/appointments/${convert(date)}`, tokenConfig(getState));
		dispatch({
			type: GET_APPOINTMENTS_BY_DATE,
			payload: res.data
		});
		console.log(res)
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
// UPDATE APPOINTMENT STATUS
export const updateAppointmentStatus = (appointment, textData) => async (
	dispatch
) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		await axios.post(
			`/api/appointments/action/${appointment._id}`,
			{ status: textData },
			config
		);
		dispatch({
			type: UPDATE_APPOINTMENT_STATUS,
			payload: {
				data: appointment,
				value: textData,
			},
		});
		dispatch(
			setAlert(`Appointment Status Updated into ${textData}`, "success")
		);
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

// GET ALL GET STATUS COUNT
export const getStatusCount = (date) => async (dispatch) => {
	try {
		const res = await axios.get(`api/appointments/statuscount`);
		dispatch({
			type: GET_STATUS_COUNT,
			payload: res.data,
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

// PUT VISITED APPOINTMENT
export const updateVisitedAppointment = (data) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	try {
		await axios.post(`/api/appointments/visitstatus/${data._id}`, config);
		dispatch(setAlert("Appointment Updated Successfully", "success"));
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

export const makePrescription = (appointmentID) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const res = await axios.post(`/api/prescription/${appointmentID}`, config);
		dispatch({
			type: CREATE_PRESCRIPTION,
			payload: res.data,
		});
		dispatch(setAlert(`Prescription Created Successfully`, "success"));
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
export const updateMedicine = (appointmentID, formData) => async (dispatch) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	try {
		const res = await axios.put(
			`/api/prescription/medicean/${appointmentID}`,
			formData,
			config
		);
		dispatch({
			type: UPDATE_MEDICINE,
			payload: res.data,
		});
		dispatch(setAlert(`Medicean Added`, "success"));
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
