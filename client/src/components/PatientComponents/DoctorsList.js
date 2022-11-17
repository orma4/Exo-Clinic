import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getDoctors, setFilter } from '../../actions/patientActions';
import Doctor from './Doctor';
import FilterPop from '../PatientComponents/FilterPop';       
import Navbar from './../GeneralComponents/AppNavbar'

const DoctorsList = ({ doctors, getDoctors,filterStore,history }) => {
  useEffect(() => { 
    if(filterStore.category||filterStore.name){
      getDoctors(filterStore);
    }
    else{
      getDoctors(filterStore);
    }
  }, [filterStore]);

  return (
    <div className="DoctorList">
      <Navbar backBtn={history.goBack} title="Doctors" bg="#e0fdf7" />     
      <div className="container">
        {<FilterPop />}              

        <h4 className="result-title">
          {doctors.length === 0
            ? 'There are No doctors for this search'
            : 'Results showing Doctors'}
        </h4>
        <div>
          {doctors.map((doctor, index)=> (
            <Doctor key={index} doctor={doctor} />
          ))}
        </div>
      </div>
    </div>
  );
};

DoctorsList.propTypes = {
  doctors: PropTypes.array.isRequired,
  getDoctors: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  doctors: state.doctor.doctors,
  filterStore: state.doctor.filter,
});

export default connect(mapStateToProps, { getDoctors,setFilter })(DoctorsList);
