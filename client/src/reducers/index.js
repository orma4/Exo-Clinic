import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import doctorReducer from './doctorReducer';
import alertReducer from './alertReducer';
import appointmentReducer from './appointmentReducer';


import TableReducer from './TableReducer';
import ImageModalReducer from './ImageModalReducer';


export default combineReducers({
    error: errorReducer,
    auth: authReducer,
    doctor: doctorReducer,
    alert: alertReducer,
    appointment: appointmentReducer,
    table: TableReducer,
    imageModal: ImageModalReducer,
});