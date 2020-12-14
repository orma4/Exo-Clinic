import React,{useState,useEffect} from 'react';
import './Patients.css'
import spinner from '../../../images/icon/spinner_1.gif'
import { getDoctorPatients } from '../../../actions/doctorActions';
import { connect } from 'react-redux';



import Table from '../Dashboard/Table';
import { getEmailIcon } from '../../../assets/icons/Icon';
import { clickedImage } from '../../../actions/doctorActions';
import Sidebar from '../Sidebar/Sidebar';
import AppNavbar from '../../AppNavbar';
import appointment from '../../../reducers/appointmentReducer';



const Patients = ({patients,columns,user,getDoctorPatients}) => {
    // const [patients, setPatients] = useState([]);
  
    const {id} = user;
    useEffect(() => {
        getDoctorPatients(id);
    }, [])
    const getEmailLogo = ({ email }) => {
        return getEmailIcon({ email });
    };
    const tableCallbacks = {  email: getEmailLogo }
    return (
        <div className="container-fluid bg-light">
        <AppNavbar/>
        <div className="row">
        <Sidebar/>
        <div className="col-md-10 p-4">
        <h2>Patients</h2>
        <div style={{backgroundColor:"#fff"}} className="my-5 p-3">
            <div className="d-flex flex-items justify-content-between my-5">
            <h4>All Patients</h4>
            </div>

            <Table 
                    // appointments={ appointments.filter(appointment=> dateComapre(appointment.date)) }
                    rows = {patients}
                    columns={ columns }
                    tableCallbacks={tableCallbacks}
                    
                    />
           
        </div>
    </div>
    </div>
    </div>
    );
};
const mapStateToProps = state => ({
    patients: state.doctor.patients,
    user: state.auth.user,
    columns: state.table.patientsTable.columns,
    imageModal: state.imageModal,
  });
  

export default  connect(mapStateToProps, { getDoctorPatients })(Patients);