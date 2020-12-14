import React from 'react';
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primeicons/primeicons.css';
import { useEffect } from 'react';
import { useState } from 'react';
import './AppointmentCalendar.css';
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import { Calendar } from "react-modern-calendar-datepicker";
import { getAppointmentsByDate } from '../../../actions/appointmentActions';
import { connect } from 'react-redux';

const AppointmentCalendar = (props)=> {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = String(date.getDate());
     

    const defaultValue = {
      year: year,
      month: month+1,
      day: day
    };

    
    const [selectedDay, setSelectedDay] = useState(defaultValue);

   
    useEffect(() => {
      props.getAppointmentsByDate(selectedDay);
      console.log(selectedDay)
   }, [selectedDay])
  

    return (
      <Calendar
        value={selectedDay}
        onChange={setSelectedDay}
        shouldHighlightWeekends
      />
    );

}

const mapStateToProps = state => ({
  user: state.auth.user
});


export default connect(mapStateToProps, { getAppointmentsByDate })(AppointmentCalendar);
