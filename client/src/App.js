import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import './styles/main.scss';

import {Provider} from 'react-redux';
import store from './store';

import HomePage from './components/HomePage';

import { loadUser } from './actions/authActions';

// Pages
import DoctorSearch from './components/pages/DoctorSearch';
import DoctorsList from './components/pages/DoctorsList';
import DoctorDetail from './components/pages/DoctorDetail';


import DoctorBooking from './components/pages/DoctorBooking';
import BookingForm from './components/pages/BookingForm';
import BookingConfirm from './components/pages/BookingConfirm';
import PatientBookings from './components/pages/PatientBookings';
import PatientProfile from './components/pages/PatientProfile';


import PatientPrivateRoute from './components/routing/PatientPrivateRoute';
import DoctorPrivateRoute from './components/routing/DoctorPrivateRoute';
import {  Switch, BrowserRouter, Route } from 'react-router-dom';
import Dashboard from './components/DoctorComponent/Dashboard/Dashboard';
import DoctorAppointment from './components/DoctorComponent/DoctorAppointment/DoctorAppointment';
import Patients from './components/DoctorComponent/Patients/Patients';


import Video from './components/pages/Video';
import CombinedRoute from './components/routing/CombinedRoute'

class App extends Component {
  componentDidMount() {
      store.dispatch(loadUser());
  }


  render() {
    return (
      <Provider store={store}>
      <div className="App">
       <BrowserRouter>
       <Switch>
          <Route               exact path="/" component={HomePage} />
          <PatientPrivateRoute exact path="/hi" component={DoctorSearch} />
          <PatientPrivateRoute exact path="/doctors" component={DoctorsList} />
          <PatientPrivateRoute exact path="/doctors/:id" component={DoctorDetail} />
          <PatientPrivateRoute exact path="/doctors/:id/book" component={DoctorBooking} />
          <PatientPrivateRoute exact path="/confirm-booking" component={BookingForm} />
          <PatientPrivateRoute exact path="/confirmed" component={BookingConfirm} />
          <PatientPrivateRoute exact path="/bookings" component={PatientBookings} />
          <PatientPrivateRoute exact path="/userProfile" component={PatientProfile} />
          <DoctorPrivateRoute  exact path="/doctorDashboard" component={Dashboard} />
          <DoctorPrivateRoute  exact path="/doctorAppointments" component={DoctorAppointment} />
          <DoctorPrivateRoute  exact path="/doctorPatients" component={Patients} />
					<CombinedRoute             path="/meeting/:url" component={Video} />
       </Switch>
       </BrowserRouter>
       
      </div>
      </Provider>
    );
  }
  
}

export default App;
