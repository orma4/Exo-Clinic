import React from 'react';

const DoctorInfo = (props) => (
  <div className="DoctorDetail-information container">
    <div className="content">
      <h6>Education</h6>
      <ul>
        <li>
         {props.info.education}
        </li>
      </ul>
    </div>
    <div className="content">
      <h6>Specialization</h6>
      <ul>
        <li>
        {props.info.specialization}
        </li>
      </ul>
    </div>
    <div className="content">
      <h6>Services Offered</h6>
      <ul>
        <li>
        {props.info.servicesOffered}
        </li>
      </ul>
    </div>
  </div>
);

export default DoctorInfo;
