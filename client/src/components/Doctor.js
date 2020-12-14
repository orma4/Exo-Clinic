import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import like from '../assets/images/like.png';
import share from '../assets/images/share.png';

const Doctor = ({ doctor }) => {
  const {
    _id,
    name,
    category,
    description,
    fee,
    exp,
    likes,
    image,
  } = doctor;
  return (
    <div className="Doctor">
      <div className="d-flex">
        <div className="Doctor-img">
          <img src={image} alt="Avatar" />
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
                <img src={like} alt="likes" />
                <span>{likes}</span>
              </p>
            </div>
            <Link
              to={{
                pathname: `/doctors/${_id}`,
                state: { doctor },
              }}
              className="d-flex justify-content-center"
            >
              VIEW PROFILE
            </Link>
          </div>
          <div>
            <img src={share} alt="share icon" />
          </div>
        </div>
      </div>
      <div className="Doctor-cta d-flex">
        <Link
          to={{
            pathname: `/doctors/${_id}/book`,
            state: { doctor },
          }}
          className="btn btn-border flex-grow-1 f lex-md-grow-0"
        >
          Call
        </Link>
        <Link
          to={{
            pathname: `/doctors/${_id}/book`,
            state: { doctor },
          }}
          className="btn btn-full flex-grow-1 flex-md-grow-0"
        >
          Book
        </Link>
      </div>
    </div>
  );
};

Doctor.propTypes = {
  doctor: PropTypes.object.isRequired,
};

export default Doctor;
