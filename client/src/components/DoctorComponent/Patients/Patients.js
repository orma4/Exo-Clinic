import React,{useEffect} from 'react';
import './Patients.css'
import { getDoctorPatients } from '../../../actions/doctorActions';
import { connect } from 'react-redux';
import Table from '../Dashboard/Table';
import { getEmailIcon } from '../../../assets/icons/Icon';
import Sidebar from '../Sidebar/Sidebar';
import AppNavbar from '../../GeneralComponents/AppNavbar';



const Patients = ({history,patients,columns,user,getDoctorPatients}) => {
    const {id} = user;
    useEffect(() => {
        getDoctorPatients(id);
    }, [])
    const getEmailLogo = ({ email }) => {
        return getEmailIcon({ email });
    };


    var sortedArr=patients.sort(function(a, b){
            if(a.name.toLowerCase() < b.name.toLowerCase()) { return -1; }
            if(a.name.toLowerCase() > b.name.toLowerCase()) { return 1; }
            return 0;
        })

        
    const tableCallbacks = {  email: getEmailLogo }
    return (
        <>
        <AppNavbar backBtn={history.goBack}/>
        <div className="container-fluid bg-light">
        <div className="row">
        <Sidebar/>
        <div className="col-md-10 p-4">
        <div style={{backgroundColor:"#fff"}} className="my-5 p-5">
            <div className="d-flex flex-items justify-content-between my-5">
            <h4>All Patients</h4>
            </div>

            <Table 
                    rows = {sortedArr}
                    columns={ columns }
                    tableCallbacks={tableCallbacks}
                    />
           
        </div>
    </div>
    </div>
    </div>
    </>
    );
};
const mapStateToProps = state => ({
    patients: state.doctor.patients,
    user: state.auth.user,
    users: state.auth.users,
    columns: state.table.patientsTable.columns,
    imageModal: state.imageModal,
  });
  

export default  connect(mapStateToProps, { getDoctorPatients })(Patients);