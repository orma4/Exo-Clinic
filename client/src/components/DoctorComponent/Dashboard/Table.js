import React from 'react';
import ReactCollapsingTable from 'react-collapsing-table';
import PopUpAlert from './PopUpAlert';
import ImageModal from './ImageModal';
import { Row, Col } from 'reactstrap';
import DateFnsUtils from "@date-io/date-fns";
import {KeyboardDatePicker,MuiPickersUtilsProvider} from "@material-ui/pickers";
import { getAppointmentsByDate } from '../../../actions/appointmentActions';
import { connect } from 'react-redux';


export const Table = ({ rows, columns, imageModal, toggleModal, tableCallbacks, getAppointmentsByDate }) => {
    var currentLocation = window.location.href;
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = String(date.getDate());
    const defaultValue = {
      year: year,
      month: month+1,
      day: parseInt(day)
    };

    var selectedDay = defaultValue;
    var textFieldDate = defaultValue;
    const pickDateHandler = async (date) => {
      selectedDay = {
        year: date.getFullYear(),
        month: date.getMonth()+1,
        day: String(date.getDate())
      };  

      await getAppointmentsByDate(selectedDay);
    };
    
    return (
      <Row>
        <Col sm={{ size: 14, offset: 1 }}>
          { currentLocation.includes("doctorDashboard") && rows.length > 0 && <PopUpAlert msg={"upcoming appointments!"} totalResults={ rows.length } />}
          { currentLocation.includes("doctorTodayAppointments") && rows.length > 0 && <PopUpAlert msg={"appointments today!"} totalResults={ rows.length } />}
          { currentLocation.includes("doctorAppointmentsHistory") && rows.length > 0 && <PopUpAlert msg={"appointments in history!"} totalResults={ rows.length } />}
          { currentLocation.includes("doctorPatients") && rows.length > 0 && <PopUpAlert msg={"patients!"} totalResults={ rows.length } />}

          { currentLocation.includes("doctorDashboard") &&
          <div className="table-heading">
           <div className="st-date-picker">
             
           <MuiPickersUtilsProvider utils={DateFnsUtils}>
             <KeyboardDatePicker
                placeholder=""
                value={textFieldDate}
                onChange={(date) => pickDateHandler(date)}
                disablePast={true}
                InputProps={{ readOnly: true }}
                invalidDateMessage={false}
             />
           </MuiPickersUtilsProvider>
         </div>
          </div>
          }  


          <ReactCollapsingTable columns={ columns }
                                rows={ rows }
                                rowSize={ 5 }
                                column='email'
                                callbacks={ tableCallbacks }
                                showSearch={ false }
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
