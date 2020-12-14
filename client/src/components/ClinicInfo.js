import React from 'react';
import PropTypes from 'prop-types';

const ClinicInfo = ({ phone, address }) => (
  <div className="DoctorDetail-clinic container">
    <p className="phone">{phone}</p>
    <p className="address">{address}</p>
    <div className="map">
      <h3>Address on Map:</h3>
      <img
        src="https://miro.medium.com/max/4064/1*qYUvh-EtES8dtgKiBRiLsA.png"
        alt="map"
      />
    </div>
  </div>
);


ClinicInfo.propTypes = {
  phone: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
};

export default ClinicInfo;
