import React from 'react';
import './Dashboard.css'
import { useEffect } from 'react';
import { getDoctorAppointments } from '../../../actions/appointmentActions';
import { connect } from 'react-redux';
import Table from './Table';
import { getEmailIcon } from '../../../assets/icons/Icon';
import { clickedImage, getDoctorPatients } from '../../../actions/doctorActions';
import Sidebar from '../Sidebar/Sidebar';
import AppNavbar from '../../GeneralComponents/AppNavbar';

export function todayConvert() {
    var dateString = new Date();
    let month = dateString.toLocaleString('en-us', { month: 'short' });
    var day = String(dateString.getDate());
    return [month, parseInt(day)+",",dateString.getFullYear()].join(" ");
}


const Dashboard = ({appointments, getDoctorPatients, getDoctorAppointments, user, columns,
     imageModal, clickedImage,location,patients}) => {
	
    const {id} = user;
    
    if (location.state !== undefined){
        if (location.state.flag === true){
            getDoctorAppointments(id);
            location.state.flag = false;
        }
    }
 
    useEffect(() => {
       getDoctorAppointments(id);
       getDoctorPatients(id);
    }, [getDoctorPatients,id,getDoctorAppointments])
    
    
    
   const imageClicked = ({ imageURL }) => {
        clickedImage({ imageURL });
      
    };


   const getEmailLogo = ({ email }) => {
        return getEmailIcon({ email });
    };

    const tableCallbacks = { image: imageClicked, email: getEmailLogo }

    const dateComapre = (date) => { 
        var today = todayConvert();

        if (Date.parse(today) <= Date.parse(date) )
            return true;
        else
            return false;
    }
   
    const rows= appointments.sort((a,b)=>{ 
        return (new Date(a.date+ " "+a.time) - new Date(b.date+ " "+b.time))
        ;}).filter(appointment=> dateComapre(appointment.date)) ;

    return (
        <>
        <AppNavbar/>
        <div className="container-fluid bg-light">
            <div className="row">
            <Sidebar/>
            <div className="col-md-10 p-4">
                <div className="card-deck text-light mt-5">
                    <div style={{ backgroundColor: '#F1536E' }} className="card">
                        <div className="card-body d-flex flex-items">
                            <div className="col-sm-4">
                                <h2 className="dashboard-numbers">
                                {appointments.filter(appointment=>(appointment.status==="pending")).length}
                                </h2>
                            </div>
                            <div className="col-sm-8">
                              <p className="dashboard-statistics">Pending Appointments</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ backgroundColor: '#3DA5F4' }} className="card">
                        <div className="card-body d-flex flex-items">
                            <div className="col-sm-4">
                                <h1 className="dashboard-numbers">{appointments.filter(appointment=>(appointment.date===todayConvert())).length}</h1>
                            </div>
                            <div className="col-sm-8">
                                <p className="dashboard-statistics">Today's Appointments</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ backgroundColor: '#00C689' }} className="card">
                        <div className="card-body d-flex flex-items">
                            <div className="col-sm-4">
                                <h1 className="dashboard-numbers">{appointments.length}</h1>
                            </div>
                            <div className="col-sm-8">
                                <p className="dashboard-statistics">Total Appointments</p>
                            </div>
                        </div>
                    </div>
                    <div style={{ backgroundColor: '#FDA006' }} className="card">
                        <div className="card-body d-flex flex-items">
                            <div className="col-sm-4">
                                <h1 className="dashboard-numbers">{patients.length}</h1>
                            </div>
                            <div className="col-sm-8">
                                <p className="dashboard-statistics">Total Patients</p>
                                <h3></h3>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ backgroundColor: "#fff" }} className="my-5 p-5">
                <div className="d-flex flex-items justify-content-between my-5">
                <h4>Dashboard</h4>
                </div>
                    <Table 
                    rows = {rows} 
                    columns={ columns }
                    imageModal={ imageModal }
                    toggleModal={ imageClicked }
                    tableCallbacks={ tableCallbacks }
                    
                    />
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
  columns: state.table.dashBoardTable.columns,
  imageModal: state.imageModal,
  patients: state.doctor.patients
});

export default connect(mapStateToProps, { getDoctorAppointments, clickedImage, getDoctorPatients})(Dashboard);
