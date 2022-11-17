import React, { useEffect } from 'react';
import {
  TheSidebar,
} from './index'
import AdminDashboard from'../AdminDashboard';
import { connect  } from 'react-redux'
import { getUsers } from '../../../actions/authActions';
import { getDoctors } from '../../../actions/patientActions';
import AppNavbar from "../../GeneralComponents/AppNavbar"
import { getAllAppointments } from '../../../actions/appointmentActions';
const TheLayout = (props) => {
  useEffect(() => {
   props.getUsers();
    props.getAllAppointments();
    props.getDoctors({category:"All"})
   }, [props])

  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <AppNavbar/>
        <div className="c-body">
          <AdminDashboard/>
        </div>
      </div>
    </div>
  )
}

export default connect(null, {getAllAppointments,getDoctors,getUsers} ) (TheLayout)
