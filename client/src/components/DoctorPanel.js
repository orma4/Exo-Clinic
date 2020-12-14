import React, { Component } from 'react';
import DoctorFirstSubmit from './pages/DoctorFirstSubmit';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export class DoctorPanel extends Component {

    render() {
      console.log('panel');
      const {user} = this.props;
      if(user.isFirstTime){
        return (
          <div>
            <DoctorFirstSubmit/>
          </div>
        );
      }
      
      else {
        if(user.isApproved && !user.isFirstTime){
          return (
            <div className="container-fluid bg-light">
             <div className="row">
             <Redirect to = "/doctorDashboard"/>
             </div>
             </div>
          )
        }
        return (
          <div>
            <h1>
              Not Approved Please Wait!
            </h1>
          </div>
        )

      }
       
    }

}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, null )(DoctorPanel);
