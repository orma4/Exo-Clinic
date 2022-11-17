import React, { useEffect } from 'react';
import './DoctorAppointment.css'
import Sidebar from '../Sidebar/Sidebar';
import AppNavbar from '../../GeneralComponents/AppNavbar';
import { connect } from 'react-redux';
import Table from '../Dashboard/Table';
import { getDoctorAppointments } from '../../../actions/appointmentActions';

const DoctorAppointmentHistory = (props) => {

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

        if (Date.parse(today) >= Date.parse(date) )
            return true;
        else
            return false;
    }
    const sortedAppointments=()=>{
      return props.appointments.sort((a,b)=>{ 
        return (new Date(b.date+ " "+b.time) - new Date(a.date+ " "+a.time))
        ;}).filter(appointment=> dateComapre(appointment.date))
    }

    return (
      <>
        <AppNavbar backBtn={props.history.goBack}/>
        <div className="container-fluid bg-light">
                  <div className='row'>
                    <Sidebar/>
                    {typeof props.appointments[0] &&
                      <div className="col-md-10 p-4">
                      <div style={{ backgroundColor: "#fff" }} className="my-5 p-5">
                         <div className="d-flex flex-items justify-content-between my-5">
                          <h4>Appointments History</h4>
                          </div>
                         <Table 
                            rows={ sortedAppointments() }
                            columns={ props.columns }
                          /> 
                          </div>
                          </div> 
}
                     </div> 
            </div>
</>
    );
};


const mapStateToProps = state => ({
    appointments: state.appointment.appointments,
    user: state.auth.user,
    columns: state.table.appointmentsHistoryTable.columns,
  });
  
export default connect(mapStateToProps, { getDoctorAppointments })(DoctorAppointmentHistory);





