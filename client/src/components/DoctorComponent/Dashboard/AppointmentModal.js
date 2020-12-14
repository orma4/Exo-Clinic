import React, { useState, useEffect} from 'react';
import './AppointmentModal.css'
import { useForm } from 'react-hook-form';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import { deleteAppointment, getPatientAppointments, updateAppointment,getDoctorAppointments} from '../../../actions/appointmentActions';
import { connect } from 'react-redux';
import {
  // Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { clearErrors } from '../../../actions/errorActions';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import './style.css'
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const AppointmentModal = (props) => {
  const classes = useStyles();
  const { errors, register } = useForm();
 // const [appointment, setAppointment] = useState({...props.appointment});
  const [modal, setModal] = useState(false);

  var appointment = {...props.appointment};
  const {id} = props.user;
  const {userType} = props.user;
 // console.log(appointment);
  const onSubmit = (data, e) => {
    // setAppointment({ ...appointment })
    console.log(appointment);
     props.updateAppointment(appointment);
     //if(userType==="doctor")
       // props.getDoctorAppointments(id);
      if(userType==="patient")
        props.getPatientAppointments(id)
     toggle();
  
  };


  const onChange = (e) => {
    appointment = {
      ...appointment,
      date: moment(e.target.value).format('ll')
    }
   // setAppointment({...appointment, date: moment(e.target.value).format('MMM Do, YYYY') }) 

    console.log(appointment)
  };

  const onHandleTimeChange = (time) => {
    appointment = {
      ...appointment,
      time: time.format('HH:mm')
    }
   // setAppointment({...appointment,time: time.format('HH:mm')}) 
    console.log(appointment)

  };
  const toggle = () => {
    //Clear Errors
    props.clearErrors();
    setModal(!modal);
};

const statusHandler = async (e) => {
  e.persist();
  appointment = {
      ...appointment,
      [e.target.name]: e.target.value
  }
  await props.updateAppointment({...appointment,[e.target.name]: e.target.value});
  alert(`Appointment ${e.target.value}`);
}

const handleClickDelete = () => {
  console.log(appointment._id);
  props.deleteAppointment(appointment._id);
}

const submit = () => {
  confirmAlert({
    customUI: ({ onClose }) => {
      return (
        <div className='custom-ui'>
          <h1>Are you sure?</h1>
          <p>You want to delete this file?</p>
          <button onClick={onClose}>No</button>
          <button
            onClick={() => {
              handleClickDelete();
              onClose();
            }}
          >
            Yes, Delete it!
          </button>
        </div>
      );
    }
  });
};




  return (
        <div>
              {
                (userType==="doctor"&&appointment.status) &&
                 <select onChange={(e)=>statusHandler(e,appointment._id)} className="form-control-sm text-light select" name="status">
                 <option selected disabled hidden>{appointment.status}</option>
                 <option value="approved">Approved</option>
                 <option value="cancelled">Cancelled</option>
                 </select>
                }
                <button data-toggle="modal" onClick={toggle} className="btn btn-warning text-light"> 
                <span className="fa fa-pencil btn btn-warning text-light"/> 
                </button> 
              
                <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={submit}
                startIcon={<DeleteIcon />}
              >
                Delete
           </Button>

           {/* <div className='container'>
        <button onClick={submit}>Confirm dialog</button>
      </div> */}
                <Modal
                isOpen={modal}
                toggle={toggle}>
                    <ModalHeader 
                    toggle={toggle}>
                    Update Appointment
                    </ModalHeader>
                        <ModalBody>
                          <Form>
                              <FormGroup >
                                <Label for='date'> 
                                      Date
                                  </Label>
                                  <Input
                                 defaultValue={appointment.date} type="date" 
                                 min={new Date().toISOString().split('T')[0]}
                                 className="form-control text-uppercase" name="date"
                                 onChange={onChange} 
                                 ref={register({ required: true })}
                                 />
                                {errors.date && <span className="text-danger">Date is required</span>}

                                <Label for='fromTime'>
                                 Start Time
                                  </Label>
                            
                                <TimePicker
                                  showSecond={false}
                                  // defaultValue={}
                                  className="time-picker"
                                  onChange={onHandleTimeChange}
                                  format="h:mm a"
                                  minuteStep = { 15 }
                                  // use12Hours
                                  inputReadOnly
                                  />
                                {errors.from && <span className="text-danger">Time is required</span>}

                                  {/* <Button
                                  color="dark"
                                  style = {{marginTop: '2rem'}}
                                  onClick={toggle}
                                  block
                                  >
                                  Cancel</Button> */}
                                <div>
                                  <Button
                                  color="primary"
                                  // style = {{marginTop: '2rem'}}
                                  onClick={onSubmit}
                                  className={classes.button}
                                  startIcon={<SaveIcon />}
                                  variant="contained"
                                  size="large"
                                  
                                  block
                                  >
                                  Update Appointment</Button>
                                  </div>
                              </FormGroup>
                              </Form>  
                        </ModalBody>
                </Modal>
            </div>

  );
};

 
const mapStateToProps = state => ({
    user: state.auth.user,
  });
export default connect(mapStateToProps, { deleteAppointment, updateAppointment, clearErrors,
   getDoctorAppointments,getPatientAppointments })(AppointmentModal);
