import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { getPatientAppointments } from '../../actions/appointmentActions';

import AppNavbar from '../AppNavbar';
import BookingItem from '../BookingItem';
import appointment from '../../reducers/appointmentReducer';
const PatientBookings = ({appointments, getPatientAppointments,user, location}) => {
  
  const {id} = user || location.state.user;
  
      useEffect(() => {
        getPatientAppointments(id);    
      }, []); 

  return (
    <div className="Bookings">
      <AppNavbar bg="#e0fdf7" title="Your Bookings" backBtn="/" />
      <div className="container"> 
     
      {appointments.map((appointment)=>
        (<BookingItem key={appointment._id} appointment={appointment}/>))  
}
{/* {console.log("asd")} */}
      {
        
      !appointments.length &&
      <h1>You don't have any upcoming appointments!</h1>
      }
      
      </div>
    </div>
  );
};

PatientBookings.propTypes = {
  appointments: PropTypes.array.isRequired,
  getPatientAppointments: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  appointments: state.appointment.appointments,
  user: state.auth.user
});

export default connect(mapStateToProps, { getPatientAppointments })(PatientBookings);
