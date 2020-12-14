import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import like from '../assets/images/like.png';
import share from '../assets/images/share.png';
import { connect } from 'react-redux'
import {getSingleDoctor} from '../actions/patientActions'
import AppointmentModal from './DoctorComponent/Dashboard/AppointmentModal';
import { Button } from 'reactstrap';

const BookingItem = ({appointment}) => {

const {
  doctor,
  patient,
  date,
  reason,
  time,
  status,
  prescription
} = appointment;

const {
  _id,
name,
category,
description,
fee,
exp,
likes,
image,
} = (doctor||{});


const join = () => {
  var url = appointment._id;
  window.location.href = `/meeting/${url}`;
}



  return (
  // <div>{`${doctor.}`}</div>
  <div className="BookingItem">
    {doctor && (   
    <div className="d-flex">
      <div className="BookingItem-img">
        {/* <img src={doctor.image} alt="Avatar" /> */}
      </div>
      <div className="BookingItem-info d-flex justify-content-between w-100">
        <div>
              <h4 className="BookingItem-title">{`Dr. ${name}`}</h4>
          <p className="BookingItem-category">{category}</p>
          <p className="BookingItem-description">{description}</p>
          <div className="BookingItem-exp d-flex">
            <p>{`${fee}`}</p>
            <p>{`${exp} yrs of experience`}</p>
            <p>
              <img src={like} alt="likes" />
              <span>{likes}</span>
            </p>
          </div>
          <div className="book-info">
            <h6>Booking Information:</h6>
            <p>
              Date -
              <span>{date}</span>
            </p>
            <p className="book-time">
              Time -
              <span>{time}</span>
            </p>
            <p>
              Patient name -
              <span>{patient.name}</span>
            </p>
            <p className="book-time">
              Reason to visit -
              <span>{reason}</span>
            </p>
            <Link  to={{
              pathname: `/doctors/${doctor._id}`,
              state: { doctor }
            }}
            className="d-flex justify-content-center">VIEW PROFILE</Link>

           <AppointmentModal appointment={appointment}/>
           <Button variant="contained" color="primary" onClick={join} 
            style={{ margin: "20px" }}>Open Meeting</Button>
          </div>
        </div>
        <div>
          <img src={share} alt="share icon" />
        </div>
      </div>
    </div>
    )}
  </div>

  )
  }
// } 
  


BookingItem.propTypes = {
  patient: PropTypes.string.isRequired,
  reason: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  singleDoctor: PropTypes.object,
  getSingleDoctor:PropTypes.func
};






export default connect(null,{getSingleDoctor})(BookingItem)