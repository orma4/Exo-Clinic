import React, { Component } from 'react';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import 'rc-time-picker/assets/index.css';
import star from '../../assets/images/star.png';
import Navbar from './../GeneralComponents/AppNavbar'
import { format } from 'date-fns'
import { enGB } from 'date-fns/locale'
import { DatePickerCalendar } from 'react-nice-dates'
import 'react-nice-dates/build/style.css'
import { connect } from 'react-redux';
import { getDoctors, getSingleDoctor } from '../../actions/patientActions';
import { Redirect } from 'react-router';
import { userIsExsist } from '../../actions/authActions';

class DoctorBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      today: new Date(),
      selectedDate: new Date(),
      time:null,
      isExsist:null
        };
  }

  componentDidMount(){
    const id=String(this.props.match.params.id)
    this.props.getSingleDoctor(id)
    this.props.getDoctors({category:"All"})
  }
  async componentDidUpdate(){
    const id=String(this.props.match.params.id)
    if(!this.state.isExsist){
     this.setState({isExsist:  await this.props.userIsExsist(id)})
    }
    }
  
  handleDateSelect = date => {
    this.setState({ selectedDate: date });
  };

  handleTimeChange = time => {
    if(time){
    time.set("minute",null)
     this.setState({time}); 
    }
    else{
      this.setState({time:null})

    }
  };

  disabledHours=()=>{
    const disabledHours=[]
    const {today}=this.state
    if(this.state.today.getDate()===this.state.selectedDate.getDate()&&this.state.today.getMonth()===this.state.selectedDate.getMonth()&&this.state.today.getFullYear()===this.state.selectedDate.getFullYear()){
      for(var i=today.getHours();i>=0;i--){
      disabledHours.push(i)
    }
    }
    return disabledHours;
  
  }


  handleSubmit = () => {
    const { time, selectedDate } = this.state;
    const { history } = this.props;
    const id=String(this.props.match.params.id)
    const doctor=		this.props.doctors&&this.props.doctors.find(user=>id===user._id);
    let disabledTime = this.disabledHours();
    let today = new Date();
    var isTaken=false;

         if (!time || !selectedDate) {
          alert('Selecting date and time is manadatory');
        } else if(this.state.time&&today.getDate()===this.state.selectedDate.getDate()&&
        today.getMonth()===this.state.selectedDate.getMonth()&&
        today.getFullYear()===this.state.selectedDate.getFullYear() && disabledTime.includes(this.state.time.get("hour"))){
             
        alert("Please select correct time")   
      }
      else {
      doctor.takenAppointments.forEach(object => {
        
          if(this.state.time&&new Date(object.date).getDate()===this.state.selectedDate.getDate()&&new Date(object.date).getMonth()===this.state.selectedDate.getMonth()&&new Date(object.date).getFullYear()===this.state.selectedDate.getFullYear())
         {  
          if(parseInt(object.time.slice(0,2))===(this.state.time).get('hour')&&parseInt(object.time.slice(3,5))===(this.state.time).get('minute'))
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

            history.push({
        pathname: '/confirm-booking',
        state: {
          doctor,
          date: moment(selectedDate).format('ll'),
          time: time.format('HH:mm'),
        }, });
      
            }
 }
  };
   generateOptions( excludedOptions=[15]) {
    const arr = [];
    for (let value = 0; value < 60; value=value+15) {
      if (excludedOptions.indexOf(value) < 0) {
        arr.push(value);
      }
    }
    return arr;
  }

  render() {
    const id=String(this.props.match.params.id)
    const doctor=		this.props.doctors.find(user=>id===user._id);
   
    const  disableTakenMinutes=()=>{
      const disabledTakenMin=[]
      if((!this.state.time)){
        return [0,15,30,45]
      }
      doctor.takenAppointments.forEach(object => {
        
          if(this.state.time&&new Date(object.date).getDate()===this.state.selectedDate.getDate()&&this.state.today.getMonth()===this.state.selectedDate.getMonth()&&this.state.today.getFullYear()===this.state.selectedDate.getFullYear())
         {           
          if(parseInt(object.time.slice(0,2))===(this.state.time).get('hour'))
          disabledTakenMin.push(parseInt(object.time.slice(3,5)))
          
          
        }  
      })
    return disabledTakenMin;
  }
 
    return (
      
      <div className="DoctorBooking">
        <Navbar
          bg="#266a61"
          title="Confirm Timing"
          backBtn={this.props.history.goBack}
        />
        <div className="container">
          <div className="time mt-5">
            <p>Select Time & Date:</p>
          
            <TimePicker
              showSecond={false}
              className="time-picker"
              onChange={this.handleTimeChange}
              format="HH:mm "
              minuteStep={15}
              onOpen={this.handleHourChange}
              disabledHours={this.disabledHours}
              disabledMinutes={disableTakenMinutes}
              inputReadOnly     
            />
          </div>      

      <p>
        <strong>
        Selected date: {this.state.selectedDate ? format(this.state.selectedDate, 'dd MMM yyyy', { locale: enGB }) : 'none'}.
        </strong>
      </p>
      <DatePickerCalendar 
      locale={enGB} 
      autoOk
      orientation="landscape"
      variant="static"
      openTo="date"
      date={this.state.selectedDate}
      onDateChange={this.handleDateSelect} 
      width="100%"
      minimumDate={moment().toDate()}
      height={300}
       />
{this.state.isExsist===false
&&(<Redirect to="/404"/>)}
{doctor&&
          <div className="detail">
            <button type="submit" onClick={this.handleSubmit} className="book-btn">
              Book Appointment
            </button>
            <h5 className="title">{`Dr. ${doctor.name}`}</h5>
            <p className="category">{doctor.category}</p>
            <p className="address">{doctor.address}</p>
            <div className="d-flex exp">
              <p>{`$${doctor.fee}`}</p>
              <p>{`${doctor.exp} yrs of experience`}</p>
              <p>
                <img src={star} alt="likes" />
                <span>{doctor.likes}</span>
              </p>
            </div>
          </div>
  }
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  authenticated: state.auth.isAuthenticated,
  doctors: state.doctor.doctors,
});

export default connect(mapStateToProps,{getDoctors,userIsExsist, getSingleDoctor})(DoctorBooking);
