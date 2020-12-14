import React, { Component} from 'react';
import { connect } from 'react-redux';

import DoctorPanel from './DoctorPanel';
import PatientPanel from './PatientPanel';
import AppNavbar from './AppNavbar'


class HomePage extends Component {
   
     checkType = (userType) => {
        console.log("userType")
        switch(userType){
            case "patient":
                return <PatientPanel/>
            case "doctor":
                return <DoctorPanel/>
            case "admin": 
                return <h4>admin</h4> 
            default:
                return;
        }
    }


    render(){
        const {user} = this.props;
        const userType = (( user || {} ).userType || {})
        
        return(
            <div>
                  <AppNavbar/>
                  {console.log(userType)}
                {localStorage.getItem('isLogged')  === "true" ? this.checkType(userType)
                 :  <h4 className="mb-3 ml-4">Please Log in to manage account</h4> 
                }

                {/* { userType === "patient" ? 
                <PatientPanel/>
              :  userType ==='doctor' ? <DoctorPanel/> : userType ==='admin' ? <h4>admin</h4> : <h4 className="mb-3 ml-4">Please Log in to manage account</h4> }     */}
            </div>
        )
    }


}

const mapStateToProps = state => ({
    user: state.auth.user,
    auth: state.auth.isAuthenticated
});

export default connect(mapStateToProps, null )(HomePage);