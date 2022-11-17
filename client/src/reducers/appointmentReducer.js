import { 	
  PICK_APPOINTMENT_DATE,
	GET_STATUS_COUNT,
  GET_APPOINTMENTS, 
  CREATE_APPOINTMENT, 
  DELETE_APPOINTMENT, 
  UPDATE_APPOINTMENT,
  GET_APPOINTMENTS_BY_DATE,
  CREATE_REPORT,
  GET_ALL_APPOINTMENTS,
} from '../actions/types';

const initialState = {
  appointmentDate: null,
  appointment: null,
  appointments: [],
  allAppointments:[],
  doctorAppointments:[],
  loading: true,
	error: [],
	status: {},
};

const appointment = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_REPORT:
    case CREATE_APPOINTMENT:
      return { ...state, appointment: payload , appointments: [payload, ...state.appointments] ,
        loading: false,
        status: { ...state.status, total: state.total + 1 }};
    case UPDATE_APPOINTMENT:
      return { ...state, appointment: payload , 
              appointments: [payload, ...state.appointments.filter(appointment =>appointment._id !== payload._id)]};
    case GET_APPOINTMENTS_BY_DATE:
    case GET_APPOINTMENTS:
      return { ...state, appointments: payload ,loading: false};
    case DELETE_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.filter(appointments => appointments._id !== action.payload)
    };

    case PICK_APPOINTMENT_DATE:
			return {
				...state,
				appointmentDate: payload,
			};
    case GET_ALL_APPOINTMENTS:
      return {
				...state,
				allAppointments: payload,
			};
    
		case GET_STATUS_COUNT:
			return {
				...state,
				loading: false,
				status: payload,
			};
    default:
      return state;
  }
};

export default appointment;
