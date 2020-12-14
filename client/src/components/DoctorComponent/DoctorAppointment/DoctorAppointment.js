import React, { useEffect, useState } from 'react';
import spinner from '../../../images/icon/spinner_1.gif'
import './DoctorAppointment.css'
import Sidebar from '../Sidebar/Sidebar';
import AppointmentCalendar from './AppointmentCalender';
import AppNavbar from '../../AppNavbar';
import { connect } from 'react-redux';
import Table from '../Dashboard/Table';

const DoctorAppointment = (props) => {
 // const {appointments} = props || {};
// typeof array[index] == 'undefined'
  console.log( typeof props.appointments[0])
    return (
        <div className="container-fluid bg-light">
                <AppNavbar/>
                  <div className='row'>
                    <Sidebar/>
                    {/* <AppointmentCalendar /> */}
                    { typeof props.appointments[0] && 
                         <Table 
                            rows={ props.appointments }
                            columns={ props.columns }
                            />             
                    }
                     </div> 
            </div>

    );
};


const mapStateToProps = state => ({
    appointments: state.appointment.appointments,
    user: state.auth.user,
    columns: state.table.appointmentsTable.columns,
  });
  
  export default connect(mapStateToProps)(DoctorAppointment);




    // const today = new Date();
    // today.setMinutes(today.getMinutes()-today.getTimezoneOffset());
    // const date = JSON.stringify(today).slice(1,11);
    // const [appointments, setAppointments] = useState([]);
    // useEffect(() => {
    //     fetch('https://doctors-portal-srv.herokuapp.com/appointments')
    //         .then(res => res.json())
    //         .then(data => setAppointments(data))
    // }, [])
    // const [filterAppointments,setFilterAppointments] =useState([]);
    // useEffect(()=>{
    //     var filterArray = []
    //     appointments.filter(appointment=>{
    //         if(appointment.date === (props.date?props.date:date) ){
    //             filterArray.push(appointment)
    //         }
    //     })
    //     setFilterAppointments(filterArray)
    // },[date,props,appointments])
    // const visitHandler = (e,id) => {
    //     fetch('https://doctors-portal-srv.herokuapp.com/updateVisited', {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({
    //             [e.target.name]:e.target.value,
    //             id
    //         })
    //       })
    //       .then(res => res.json())
    //       .then(data => {
    //         alert("update success")
    //       })  

    // }








