import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import star from '../../assets/images/star.png';
import { addRecommendation } from '../../actions/doctorActions';
import { connect } from 'react-redux';
import noPic from "../../assets/images/no-pic.jpeg";

const Doctor = ({ doctor }) => {
  var {
    _id,
    name,
    category,
    description,
    fee,
    exp,
    image,
    recommendations
  } = doctor;
  return (
    <div className="Doctor">
      <div className="d-flex">
        <div className="Doctor-img">
          <img src={image?image:noPic} alt="Avatar" />
        </div>
        <div className="Doctor-info d-flex justify-content-between w-100">
          <div>
            <h4 className="Doctor-title">{`Dr. ${name}`}</h4>
            <p className="Doctor-category">{category}</p>
            <p className="Doctor-description">{description}</p>
            <div className="Doctor-exp d-flex">
              <p>{`$${fee}`}</p>
              <p>{`${exp} yrs of experience`}</p>
              <p>
                <img src={star} alt="likes" />
                <span>{recommendations.length}</span>
              </p>
            </div>
          </div>
          <div>
          </div>
        </div>
      </div>
      <div className="Doctor-cta d-flex">
    
        <Link
          to={{
            pathname: `/doctors/${_id}/book`,
            state: { doctor },
          }}
          className="btn btn-full flex-grow-1 flex-md-grow-0"
        >
          Book
        </Link>

        <NavLink
              to={{
                pathname: `/doctors/${_id}`,
                state: { doctor },
              }}
              className="btn btn-full flex-grow-1 flex-md-grow-0"  
             
            >
              View Profile
        </NavLink>
      </div>
    </div>
  );
};

Doctor.propTypes = {
  doctor: PropTypes.object.isRequired,
};

export default connect(null,{addRecommendation}) (Doctor);
