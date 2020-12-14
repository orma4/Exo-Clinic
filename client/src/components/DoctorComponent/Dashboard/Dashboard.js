import React, {useState} from 'react';
import './Dashboard.css'
import { useEffect } from 'react';
import spinner from '../../../images/icon/spinner_1.gif'
import { getDoctorAppointments } from '../../../actions/appointmentActions';
import { connect } from 'react-redux';



import Table from './Table';
import { getEmailIcon } from '../../../assets/icons/Icon';
import { clickedImage } from '../../../actions/doctorActions';
import Sidebar from '../Sidebar/Sidebar';
import AppNavbar from '../../AppNavbar';



const Dashboard = ({appointments, getDoctorAppointments, user, columns, imageModal, clickedImage,location,patients}) => {
	
    const {id} = user;
    if (location.state !== undefined){
        if (location.state.flag === true){
            console.log(location.state.flag)
            getDoctorAppointments(id);
            location.state.flag = false;
        }
    }
 
    console.log(appointments);
    useEffect(() => {
       getDoctorAppointments(id);
    }, [getDoctorAppointments])
    
    
    
   const imageClicked = ({ imageURL }) => {
        clickedImage({ imageURL });
      
    };


   const getEmailLogo = ({ email }) => {
        return getEmailIcon({ email });
    };

    const getAppointmentsLength = ({ email }) => {
        return getEmailIcon({ email });
    };


    const tableCallbacks = { image: imageClicked, email: getEmailLogo }


    function todayConvert() {
		var dateString = new Date();
        let month = dateString.toLocaleString('en-us', { month: 'short' });
        var day = String(dateString.getDate());
		return [month, parseInt(day)+",",dateString.getFullYear()].join(" ");
    }
    
     
    const dateComapre = (date) => { 
        var today = todayConvert();
       console.log(date)

        if (Date.parse(today) <= Date.parse(date) )
            return true;
        else
            return false;
    }


    return (
        <div className="container-fluid bg-light">
            <AppNavbar/>
            <div className="row">
            <Sidebar/>
            <div className="col-md-10 p-4">
                <h2>Dashboard</h2>
                <div className="card-deck text-light mt-5">
                    <div style={{ backgroundColor: '#F1536E' }} className="card">
                        <div className="card-body d-flex flex-items">
                            <div className="col-sm-4">
                                <h1>
                                {appointments.filter(appointment=>(appointment.status==="pending")).length}
                                </h1>
                            </div>
                            <div className="col-sm-8">
                                <h3>Pending Appointment</h3>
                            </div>
                        </div>
                    </div>
                    <div style={{ backgroundColor: '#3DA5F4' }} className="card">
                        <div className="card-body d-flex flex-items">
                            <div className="col-sm-4">
                                {/* {appointments.map(appointment=>console.log(appointment.date))} */}
                                <h1>{appointments.filter(appointment=>(appointment.date===todayConvert())).length}</h1>
                            </div>
                            <div className="col-sm-8">
                                <h3>Today's Appointment</h3>
                            </div>
                        </div>
                    </div>
                    <div style={{ backgroundColor: '#00C689' }} className="card">
                        <div className="card-body d-flex flex-items">
                            <div className="col-sm-4">
                                <h1>{appointments.length}</h1>
                            </div>
                            <div className="col-sm-8">
                                <h3>Total Appointment</h3>
                            </div>
                        </div>
                    </div>
                    <div style={{ backgroundColor: '#FDA006' }} className="card">
                        <div className="card-body d-flex flex-items">
                            <div className="col-sm-4">
                                <h1>{patients.length}</h1>
                            </div>
                            <div className="col-sm-8">
                                <h3>Total Patients</h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ backgroundColor: "#fff" }} className="my-5 p-3">
                    <div className="d-flex flex-items justify-content-between my-5">
                        <h4>Upcoming Appointments</h4>
                    </div>

                   
                 
                    <Table 
                    // appointments={ appointments.filter(appointment=> dateComapre(appointment.date)) }
                    rows = { appointments }
                    columns={ columns }
                    imageModal={ imageModal }
                    toggleModal={ imageClicked }
                    tableCallbacks={ tableCallbacks }
                    
                    />



                    </div>
            </div>
            </div>
        </div>
    );
};

 
const mapStateToProps = state => ({
  appointments: state.appointment.appointments,
  user: state.auth.user,
  columns: state.table.dashBoardTable.columns,
  imageModal: state.imageModal,
  patients: state.doctor.patients
});

export default connect(mapStateToProps, { getDoctorAppointments, clickedImage })(Dashboard);
