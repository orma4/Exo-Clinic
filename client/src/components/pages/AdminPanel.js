import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navbar from '../layout/Navbar';

import { addDoctor } from '../../redux/actions/doctor';

const AdminPanel = ({ addDoctor }) => {
  const [doctorData, setDoctorData] = useState({
    name: '',
    image: '',
    category: '',
    description: '',
    fee: '',
    exp: '',
    likes: '',
    phone: '',
    address: '',
  });

  const {
    name,
    image,
    category,
    description,
    fee,
    exp,
    likes,
    phone,
    address,
  } = doctorData;

  const handleChange = e => setDoctorData({ ...doctorData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    addDoctor({ ...doctorData });
  };

  return (
    <div className="AdminPanel">
      <Navbar title="Admin Panel" bg="#e0fdf7" backBtn="/" />

      <form className="container" onSubmit={e => handleSubmit(e)}>
        <div className="form-field">
          <label htmlFor="name">Doctor's name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={e => handleChange(e)}
            placeholder="Enter doctor's name"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="image">Doctor image</label>
          <input
            type="text"
            name="image"
            id="image"
            value={image}
            onChange={e => handleChange(e)}
            placeholder="Enter doctor's image url"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            id="category"
            value={category}
            onChange={e => handleChange(e)}
            placeholder="Enter doctor's category"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={description}
            onChange={e => handleChange(e)}
            placeholder="Enter doctor's description"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="fee">Doctor Fee</label>
          <input
            type="number"
            name="fee"
            id="fee"
            value={fee}
            onChange={e => handleChange(e)}
            placeholder="Enter doctor's fee"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="exp">Doctor Experience</label>
          <input
            type="number"
            name="exp"
            id="exp"
            value={exp}
            onChange={e => handleChange(e)}
            placeholder="Enter doctor's experience"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="likes">Doctor Likes</label>
          <input
            type="number"
            name="likes"
            id="likes"
            value={likes}
            onChange={e => handleChange(e)}
            placeholder="Enter doctor's Likes"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="phone">Doctor Phone no.</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={phone}
            onChange={e => handleChange(e)}
            placeholder="Enter doctor's phone"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="address">Doctor Address</label>
          <input
            type="text"
            name="address"
            id="address"
            value={address}
            onChange={e => handleChange(e)}
            placeholder="Enter doctor's Address"
            required
          />
        </div>

        <input type="submit" value="Add Doctor" className="book-btn" />
      </form>
    </div>
  );
};

AdminPanel.propTypes = {
  addDoctor: PropTypes.func.isRequired,
};

export default connect(null, { addDoctor })(AdminPanel);
