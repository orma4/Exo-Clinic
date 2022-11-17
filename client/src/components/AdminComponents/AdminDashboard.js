import React, { lazy } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCardGroup
} from '@coreui/react'
import {
  CChartBar,
  CChartPie,
} from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { getUsers } from '../../actions/authActions';
import { useSelector } from 'react-redux'
import{approveDoctor} from "../../actions/authActions"
import { connect } from 'react-redux';
import noPic from "../../assets/images/no-pic.jpeg"
import { Icon } from '@iconify/react';
import ilIcon from '@iconify-icons/cif/il';


const WidgetsDropdown = lazy(() => import('./WidgetsDropdown'))

const AdminDashboard = (props) => {
  const statusHandler =  async(e,user) => {
   e.persist();
   alert(`Doctor is ${e.target.value}`);
   e.target.value==="approved"? user = {...user,[e.target.name]:true } : user= {...user,[e.target.name]:false };
   props.approveDoctor(user);
   props.getUsers()
    
   }

  const appointments=useSelector(state => state.appointment.allAppointments)
  const doctors=useSelector(state => state.doctor.doctors)
  const users=useSelector(state=>state.auth.users)

  const labels= [ 
  'General Doctor',
  'Mental Health',
  'Skin',
  'Child Care',
  'Women Health',
  'Dentist',
  'ENT',
  'Homeopathy',
  'Ayurveda',
  'Heart',
  'Neurologist'
];
const getAppointmentsData=()=>{
  const data=[];
  
    data[0]=appointments.filter(appointment=>{return appointment.date.slice(0,3)==='Jan'}).length;
    data[1]=appointments.filter(appointment=>{return appointment.date.slice(0,3)==='Feb'}).length;
    data[2]=appointments.filter(appointment=>{return appointment.date.slice(0,3)==='Mar'}).length;
    data[3]=appointments.filter(appointment=>{return appointment.date.slice(0,3)==='Apr'}).length;
    data[4]=appointments.filter(appointment=>{return appointment.date.slice(0,3)==='May'}).length;
    data[5]=appointments.filter(appointment=>{return appointment.date.slice(0,3)==='Jun'}).length;
    data[6]=appointments.filter(appointment=>{return appointment.date.slice(0,3)==='Jul'}).length;
    data[7]=appointments.filter(appointment=>{return appointment.date.slice(0,3)==='Aug'}).length;
    data[8]=appointments.filter(appointment=>{return appointment.date.slice(0,3)==='Sep'}).length;
    data[9]=appointments.filter(appointment=>{return appointment.date.slice(0,3)==='Oct'}).length;
    data[10]=appointments.filter(appointment=>{return appointment.date.slice(0,3)==='Nov'}).length;
    data[11]=appointments.filter(appointment=>{return appointment.date.slice(0,3)==='Dec'}).length;

  
 
  return data;
}


const getDataDoctors=()=>{
  const data=[];
  for (let index = 0; index < labels.length; index++) {
    data[index]=doctors.filter(doctor=>{return doctor.category===labels[index]}).length;
    
  }
 

  return data;
}
  return (
    <>
      <WidgetsDropdown />
      <CCardGroup columns className = "cols-2" >
      <CCard>
        <CCardHeader>
          <h5>Appointments by months</h5>
        </CCardHeader>
        <CCardBody>
          <CChartBar
            datasets={[
              {
                label: 'Exo Clinic Appointments',
                backgroundColor: '#41B883',
                data: getAppointmentsData()
              }
            ]}
            labels="months"
            options={{
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }]
              },
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>
          <h5>Doctors by category</h5>
        </CCardHeader>
        <CCardBody>
          <CChartPie
            datasets={[
              {
                backgroundColor: [
                  '#41B883',
                  '#E46651',
                  '#00D8FF',
                  '#DA1B15',
                  '#FD1B16',
                  '#AB1B17',
                  '#AD1B18',
                  '#WD1B19',
                  '#F46651',


                ],
                data: getDataDoctors()
              }
            ]}
            labels={ labels}
            options={{
              tooltips: {
                enabled: true
              }
            }}
          />
        </CCardBody>
      </CCard>

      </CCardGroup>
      <CRow>
        <CCol>
          <CCard>
            <CCardBody>
              <table className="table ">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center"><CIcon name="cil-people" /></th>
                    <th>Doctor Name</th>
                    <th className="text-center">Country</th>
                    {/* <th>Usage</th> */}
                    <th className="text-center">Payment Method</th>
                    <th>Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.map(doctor => {
                     const user=users&&users.find(user=>user._id===doctor._id)
                    return(
                    <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img src={doctor.image?doctor.image:noPic} className="c-avatar-img" alt="" />
                        <span className="c-avatar-status bg-success"></span>
                      </div>
                    </td>
                    <td>
                      <div>{doctor.name}</div>
                      <div className="small text-muted">
                      </div>
                    </td>
                    <td className="text-center">
                      {/* <CIcon height={25} name="cif:il" title="us" id="il" /> */}
                      <Icon icon={ilIcon} height={25} />
                    </td>
                    {/* <td>
                      <div className="clearfix">
                        <div className="float-left">
                          <strong>50%</strong>
                        </div>
                        <div className="float-right">
                          <small className="text-muted">Jun 11, 2015 - Jul 10, 2015</small>
                        </div>
                      </div>
                      <CProgress className="progress-xs" color="success" value="50" />
                    </td> */}
                    <td className="text-center">
                      <CIcon height={25} name="cib-cc-visa" />
                    </td>
                    
                    <td>
                    {/* value=   */}
                    {user&&   
      <select className="form-control-lg text-light select"
      onChange={(e)=>statusHandler(e,doctor)} name="isApproved">
      
                 <option selected disabled hidden>{(user.isApproved===true? "Approved" : "Not Approved")}</option>
              
                 {/* <option selected disabled hidden>{user&&user.isApproved===true?String("Approved"):String("Not approved")}</option> */}
                 <option value="approved">Approve</option>
                 <option value="denied">Deny</option>
                 </select>
                  }
                    </td>
                  </tr>
                    
                  )})}     
                </tbody>
              </table>

            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default connect(null, {approveDoctor,getUsers} ) (AdminDashboard)
