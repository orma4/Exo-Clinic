import React, { useState} from 'react';
import './AppointmentModal.css'
import { useForm } from 'react-hook-form';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import { deleteAppointment, getPatientAppointments, updateAppointment,getDoctorAppointments} from '../../actions/appointmentActions';
import { connect } from 'react-redux';
import {getSingleDoctor} from '../../actions/patientActions';
import { format } from 'date-fns'
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { clearErrors } from '../../actions/errorActions';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { DatePickerCalendar } from 'react-nice-dates';
import { enGB } from 'date-fns/locale';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import "sweetalert2/dist/sweetalert2.all.min.js";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const AppointmentModal = (props) => {
  const classes = useStyles();
  const { errors } = useForm();
  const [modal, setModal] = useState(false);
  var [appointment,setAppointment] = useState({...props.appointment,time:null});
  const [selectedDate, setSelectedDate] = useState(new Date(appointment.date));
  const {userType} = props.user;
  const {doctor} = props;

  var todayDate = new Date();
  var dd = String(todayDate.getDate()).padStart(2, '0');
  var mm = String(todayDate.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = todayDate.getFullYear();
  
  todayDate = yyyy + '-' + mm + '-' + dd;

 const onSubmit = (data, e) => {
  const { time, date } = appointment;
  let disabledTime = disabledHours();
  let today = new Date()
  var isTaken=false;
  if (!time || !date) {
    alert('Selecting date and time is mandatory');
  } 
  
  else if(time&&today.getDate()===new Date(date).getDate()&&today.getMonth()===new Date(date).getMonth()&&
  today.getFullYear()===new Date(date).getFullYear() && disabledTime.includes(parseInt(time.slice(0,2)))){         
    alert("Please select correct time")    
}
  
  
  else {

    doctor.takenAppointments.forEach(object => {
      
        if(time&&new Date(object.date).getDate()===new Date(date).getDate()&&new Date(object.date).getMonth()===new Date(date).getMonth()&&new Date(object.date).getFullYear()===new Date(date).getFullYear())
       {  
        if(parseInt(object.time.slice(0,2))===parseInt(time.slice(0,2))&&parseInt(object.time.slice(3,5))===parseInt(time.slice(3,5)))
        {
          isTaken=true     
        } 
      }
      });
    
        if(isTaken===true)
          {
            alert("The chosen appointment is invalid");
          }
          else{
   props.updateAppointment(appointment);

   toggle();
          }
        }

};

  const onChange = (datePicker) => {
    setAppointment(
    {...appointment,
      date:moment(datePicker).format('ll')
    })

    setSelectedDate(datePicker)
  };

  const onHandleTimeChange = (time) => {
    if(time)
    
    setAppointment( {...appointment,
      time: time.format('HH:mm')
    });
    else{
      setAppointment({
        ...appointment,
        time:null});

    }
  };
  const toggle = () => {
    props.clearErrors();
    props.getSingleDoctor(appointment.doctor._id);
    setModal(!modal);
};

const statusHandler = async (e) => {
  e.persist();
  setAppointment(
    {...appointment,
      time:props.appointment.time,
      [e.target.name]: e.target.value
  }
  )
  await props.updateAppointment({...appointment,
    time:props.appointment.time,
    [e.target.name]: e.target.value
});
  alert(`Appointment ${e.target.value}`);
}

const handleClickDelete = () => {
  props.deleteAppointment(appointment._id);
}

const submit = () => {
  
  Swal.fire({
    title: 'Are you sure you want to delete appointment?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      handleClickDelete();

      Swal.fire(
        'Deleted!',
        'Your appointment is deleted',
        'success'
      )
    }
  })
};


const disabledHours=()=>{
    
  const disabledHours=[]
  const today=new Date();
  if(today.getDate()===new Date(appointment.date).getDate()){
    for(var i=today.getHours();i>=0;i--){
    disabledHours.push(i)
   
  }
  
  }
  return disabledHours;
  

}


const  disableTakenMinutes=()=>{
  const disabledTakenMin=[]
  if((!appointment.time)){
    return [0,15,30,45]
  }
  doctor.takenAppointments.forEach(object => {
      if(appointment.time&&new Date(object.date).getDate()===new Date(appointment.date).getDate()
      &&new Date(object.date).getMonth()===new Date(appointment.date).getMonth()
      &&new Date(object.date).getFullYear()===new Date(appointment.date).getFullYear())
     {           
      if(parseInt(object.time.slice(0,2))===parseInt(appointment.time.slice(0,2))){
      disabledTakenMin.push(parseInt(object.time.slice(3,5)))
      }
    }  
  })
return disabledTakenMin;
} 


  return (
        <div>
              {
                (userType==="doctor"&&appointment.status) &&
                <select  value={appointment.status} onChange={(e)=>statusHandler(e,appointment._id)} className="form-control-lg text-light select" name="status">
                 <option value="approved">Approved</option>
                 <option value="pending">Pending</option>
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
                                <p>
          <strong>
          Selected date: {selectedDate ? format(selectedDate, 'dd MMM yyyy', { locale: enGB }) : 'none'}.
          </strong>
        </p>
                                  </Label>
                                  <DatePickerCalendar 
                                locale={enGB} 
                                autoOk
                                orientation="landscape"
                                variant="static"
                                openTo="date"
                                date={selectedDate}
                                onDateChange={onChange} 
                                width="100%"
                                minimumDate={moment().toDate()}
                                height={300}
                                 />
                                <Label for='fromTime'>
                                 Start Time
                                  </Label>
                            
                                <TimePicker
                                  showSecond={false}
                                  className="time-picker"
                                  onChange={onHandleTimeChange}
                                  format="HH:mm"
                                  minuteStep = { 15 }
                                  disabledHours={disabledHours}
                                  disabledMinutes={disableTakenMinutes}
                                  inputReadOnly
                                  />
                                {errors.from && <span className="text-danger">Time is required</span>}
                                <div>
                                  <Button
                                  color="primary"
                                  onClick={onSubmit}
                                  className={classes.button}
                                  startIcon={<SaveIcon />}
                                  variant="contained"
                                  size="large"
                                  
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
    doctor:state.doctor.singleDoctor
  });
export default connect(mapStateToProps, { deleteAppointment, updateAppointment, clearErrors,
   getDoctorAppointments,getPatientAppointments, getSingleDoctor})(AppointmentModal);
