import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import success from '../../assets/images/success.png';
import AppNavbar from '../AppNavbar';

const BookingConfirm = (props) =>{ 
  const {location} = props;
  const {state} = location
  const {user} = props || state;
  const {appointment} =  state;

return (
  <div className="BookingConfirm">
    <AppNavbar backBtn="/doctors" title="Booking Confirmed" bg="#e0fdf7" />
    {appointment && (
      <div className="container BookingConfirm-info">
        <img src={success} alt="Success" />
        <h5>Appointment Confirmed</h5>
        <p className="detail">
          {`Your Appointment with Dr. ${appointment.doctor.name} on
          ${appointment.date} at ${appointment.time}
          is confirmed`}
        </p>
        <p className="time">Time & Date</p>
        <p className="time-left">{`${appointment.date} | ${appointment.time} `}</p>
        <Link to=
        { {state:{user},
          pathname: "/bookings"}} className="book-btn">
          View Bookings
        </Link>
      </div>
    )}
  </div>
);
    }
BookingConfirm.propTypes = {
  appointment: PropTypes.object,
};

const mapStateToProps = state => ({
  appointment: state.appointment.appointment,
  user: state.auth.user
});

export default connect(mapStateToProps)(BookingConfirm);
