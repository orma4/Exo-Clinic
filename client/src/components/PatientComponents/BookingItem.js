import React from 'react';
import { Link } from 'react-router-dom';
import star from '../../assets/images/star.png';
import { connect } from 'react-redux'
import {getSingleDoctor} from '../../actions/patientActions'
import AppointmentModal from '../GeneralComponents/AppointmentModal';
import { Button } from 'reactstrap';
import noPic from "../../assets/images/no-pic.jpeg";
const BookingItem = ({appointment,doctor}) => {

const {
  date,
  reason,
  time,
} = appointment;

const {
name,
category,
description,
fee,
exp,
recommendations,
} = (doctor||{});


const join = () => {
  var url = appointment._id;
  window.location.href = `/video/${url}`;
}

  return (
  <div className="BookingItem">
    {doctor && (   
    <div className="d-flex">
      <div className="BookingItem-img">
        <img src={doctor.image?doctor.image:noPic} alt="Avatar" />
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
              <img src={star} alt="likes" />
              <span>{recommendations.length}</span>
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
            <p className="book-time">
              Reason to visit -
              <span>{reason}</span>
            </p>
           

           <AppointmentModal appointment={appointment}/>
           <Button variant="contained" color="primary" onClick={join} 
            >Open Meeting</Button>
             <Link  to={{
              pathname: `/doctors/${doctor._id}`,
              state: { doctor }
            }}
            className="book-btn"  >
              View Profile</Link>
          </div>
        </div>
        <div>
        </div>
      </div>
    </div>
    )}
  </div>

  )
  }
// } 
  


// BookingItem.propTypes = {
//   patient: PropTypes.string.isRequired,
//   reason: PropTypes.string.isRequired,
//   date: PropTypes.string.isRequired,
//   time: PropTypes.string.isRequired,
//   singleDoctor: PropTypes.object,
//   getSingleDoctor:PropTypes.func
// };

export default connect(null,{getSingleDoctor})(BookingItem)