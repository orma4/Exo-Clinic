import {
  ADD_DOCTOR,
  GET_DOCTORS,
  GET_SINGLE_DOCTOR,
  DOCTOR_FILTER,
  GET_PATIENTS,
  UPDATE_DOCTOR_DETAILS,
  ADD_FEEDBACK,
  ADD_RECOMMENDATION,
  ADD_TAKEN_APPOINTMENT,
  ADD_RECOMMENDATION_SUCCESS
} from '../actions/types';

const initialState = {
  singleDoctor: null,
  doctors: [],
  patients:[],
  filter: {},
};

const doctor = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
   case ADD_FEEDBACK:
    case GET_DOCTORS:
      return { ...state, doctors: payload };
    case ADD_TAKEN_APPOINTMENT:
    case GET_SINGLE_DOCTOR:
      return { ...state, singleDoctor: payload };
    case DOCTOR_FILTER:
      return { ...state, filter: { ...payload } };
    case GET_PATIENTS:
      return {...state,patients:payload};
    case UPDATE_DOCTOR_DETAILS:
    case ADD_RECOMMENDATION_SUCCESS:
    case ADD_DOCTOR:
      return { ...state, doctors: [action.payload, ...state.doctors] , singleDoctor: payload};
	  case ADD_RECOMMENDATION:
    default:
      return state;
  }
};

export default doctor;
