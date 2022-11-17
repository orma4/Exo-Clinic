import React, { useEffect, useState } from 'react';
import './DoctorAppointment.css'
import Sidebar from '../Sidebar/Sidebar';
import AppNavbar from '../../GeneralComponents/AppNavbar';
import { connect } from 'react-redux';
import Table from '../Dashboard/Table';
import { getDoctorAppointments } from '../../../actions/appointmentActions';

const DoctorAppointment = (props) => {
  const {id} = props.user;
  useEffect(() => {
    props.getDoctorAppointments(id);
 }, [getDoctorAppointments])



  function todayConvert() {
		var dateString = new Date();
        let month = dateString.toLocaleString('en-us', { month: 'short' });
        var day = String(dateString.getDate());
		return [month, parseInt(day)+",",dateString.getFullYear()].join(" ");
    }
    
     
    const dateComapre = (date) => { 
        var today = todayConvert();
        if (Date.parse(today) === Date.parse(date) )
            return true;
        else 
            return false;
    }
    var rows=props.appointments.filter(appointment=>dateComapre(appointment.date))
    rows = rows.sort((a,b) => (new Date(a.date+ " "+a.time) - new Date(b.date+ " "+b.time)) )

    return (
      <>
        <AppNavbar backBtn={props.history.goBack}/>
        <div className="container-fluid bg-light">
                  <div className='row'>
                    <Sidebar/>
                    <div className="col-md-10 p-4">
                    <div style={{backgroundColor:"#fff"}} className="my-5 p-5">
                    <div className="d-flex flex-items justify-content-between my-5">
                     <h4>Today's Appointments</h4>
                     </div> 
                    { typeof props.appointments[0] && 
                
                    // <div style={{ backgroundColor: "#fff" }} className="my-5 p-5">
                         <Table 
                            rows={ rows }
                            columns={ props.columns }
                            />    
                    }
                      </div>
                      </div>

                     </div> 
            </div>
            </>
    );
};


const mapStateToProps = state => ({
    appointments: state.appointment.appointments,
    user: state.auth.user,
    columns: state.table.appointmentsTable.columns,
  });
  
export default connect(mapStateToProps, {getDoctorAppointments})(DoctorAppointment);
