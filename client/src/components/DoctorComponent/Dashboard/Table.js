import React, { useState, useEffect } from 'react';
import ReactCollapsingTable from 'react-collapsing-table';
import PopUpAlert from './PopUpAlert';
import ImageModal from './ImageModal';
import { Row, Col } from 'reactstrap';
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker,MuiPickersUtilsProvider} from "@material-ui/pickers";
import { getAppointmentsByDate, getDoctorAppointments } from '../../../actions/appointmentActions';
import { connect } from 'react-redux';
import appointment from '../../../reducers/appointmentReducer';


export const Table = ({ rows, columns, imageModal, toggleModal, tableCallbacks, getAppointmentsByDate,user }) => {
    var currentLocation = window.location.href;
    const {id} = user;
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = String(date.getDate());
    const res=[];
    const defaultValue = {
      year: year,
      month: month+1,
      day: parseInt(day)
    };

    var selectedDay = defaultValue;
   
    const pickDateHandler = (date) => {
      selectedDay = {
        year: date.getFullYear(),
        month: date.getMonth()+1,
        day: String(date.getDate())
      };  
      getAppointmentsByDate(selectedDay);
      console.log(selectedDay)   
    };

  //   useEffect(() => {
  //     getAppointmentsByDate(selectedDay);
  //     console.log(selectedDay)
  //  }, [selectedDay])
  
    return (
      <Row>
        <Col sm={{ size: 10, offset: 1 }}>
          { rows.length > 0 && <PopUpAlert totalResults={ rows.length } />}
          { currentLocation.includes("doctorDashboard") &&
          <div className="table-heading">
            <h1>Upcoming Appointments</h1>  
           <div className="st-date-picker">
             
           <MuiPickersUtilsProvider utils={DateFnsUtils}>
             <KeyboardDatePicker
               placeholder="2018/10/10"
               value={selectedDay}
               onChange={(date) => pickDateHandler(date)}
               disablePast={true}
             />
           </MuiPickersUtilsProvider>
         </div>
          </div>
          }  

{currentLocation.includes("doctorAppointments") && 
          
           
           (<h1>Your Appointments Today</h1> )
          }
          <ReactCollapsingTable columns={ columns }
                                rows={ rows }
                                rowSize={ 5 }
                                column='email'
                                callbacks={ tableCallbacks }
                                showSearch={ true }
                                showPagination={ true } />
          { imageModal && 
          <ImageModal isOpen={ imageModal.isOpen }
                      toggle={ toggleModal }
                      imageURL={ imageModal.imageURL } />
          }
          

        </Col>
      </Row>
    );
}

const mapStateToProps = state => ({
  appointments: state.appointment.appointments,
  user: state.auth.user,
});

export default connect(mapStateToProps, { getAppointmentsByDate })(Table);
