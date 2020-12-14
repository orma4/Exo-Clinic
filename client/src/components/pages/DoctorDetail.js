import React, { Component,useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import DoctorInfo from '../DoctorInfo';
import DoctorFeedback from '../DoctorFeedback';
import ClinicInfo from '../ClinicInfo';
import AppNavbar from '../AppNavbar';

import email from '../../assets/images/email.png';
import like from '../../assets/images/like.png';
import callAnswer from '../../assets/images/call-answer.png';

import { getSingleDoctor } from '../../actions/patientActions';
class DoctorDetail extends Component  {
  state={
    doctor:{},
    tab: null

  }

  constructor(props) {
    super(props);
    this.state = ({doctor:this.props.location.state.doctor, tab: 0} ||{doctor:this.props.singleDoc, tab: 0}) ; // In the ||, set default state.
    this.props.history.replace(this.props.location.pathname, this.state); // Update state of current entry in history stack.
  }
  componentDidMount(){
    this.props.getSingleDoctor(this.state.doctor._id);
  }
  
   renderTab = ({ phone, address }) => {
    switch (this.state.tab) {
      case 0:
        return <DoctorInfo />;
      case 1:
        return <ClinicInfo phone={phone} address={address} />;
      case 2:
        return <DoctorFeedback />;
      default:
        return 0;
    }
  };
  handleClick = (e) => {
    const id = parseInt(e.target.id.split('-')[1]);
    this.setState({tab:id});
  };

  
render(){
  const singleDoctor = this.state.doctor;
  return (
    <div className="DoctorDetail">
      <AppNavbar bg="#266a61" title="Details" backBtn="/doctors" />
      {singleDoctor && (
        <div>
          <div className="detail-card">
            <div className="DoctorDetail-info">
              <h4 className="title text-white font-weight-bold">
                {`Dr. ${singleDoctor.name}`}
              </h4>
              <div className="d-flex justify-content-center align-items-center">
                <img className="cta" src={callAnswer} alt="Call Answer" />
                <img className="avatar" src={singleDoctor.image} alt="Avatar" />
                <img className="cta" src={email} alt="email" />
              </div>
              <p className="category">{singleDoctor.category}</p>
              <div className="d-flex exp">
                <p>{`$${singleDoctor.fee}`}</p>
                <p>{`${singleDoctor.exp} yrs of experience`}</p>
                <p>
                  <img src={like} alt="likes" />
                  <span>{singleDoctor.likes}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="container d-flex tab-content">
            <button
              type="submit"
              className={`tab flex-grow-1 ${this.state.tab === 0 ? 'tab-focus' : ''}`}
              id="tab-0"
              onClick={e => this.handleClick(e)}
            >
              Doctor Info
            </button>
            <button
              type="submit"
              className={`tab flex-grow-1 ${this.state.tab === 1 ? 'tab-focus' : ''}`}
              id="tab-1"
              onClick={e => this.handleClick(e)}
            >
              Clinic Info
            </button>
            <button
              type="submit"
              className={`tab flex-grow-1 ${this.state.tab === 2 ? 'tab-focus' : ''}`}
              id="tab-2"
              onClick={e => this.handleClick(e)}
            >
              Feedback
            </button>
          </div>
          {this.renderTab(singleDoctor)}
          <Link
            to={{
              pathname: `/doctors/${singleDoctor._id}/book`,
              state: { doctor: singleDoctor },
            }}
            className="book-btn"
          >
            Book Appointment
          </Link>
        </div>
      )}
    </div>
  );
}}

DoctorDetail.propTypes = {
  getSingleDoctor: PropTypes.func.isRequired,
  singleDoctor: PropTypes.object,
};

const mapStateToProps = state => ({
  singleDoc: state.doctor.singleDoctor,
  
});

export default connect  (mapStateToProps, { getSingleDoctor })(DoctorDetail);