import React, { Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DoctorPanel from './../DoctorComponent/DoctorPanel';
import { TheLayout } from '../AdminComponents/containers';
import LandingPage from "./LandingPage.js";

class HomePage extends Component {
    
     checkType = (userType) => {
        switch(userType){
            case "patient":
                return <Redirect to='/home'/>
            case "doctor":
                return <DoctorPanel/>
            case "admin":
                return <TheLayout/> 
            default:
                return;
        }
        }
        
    
    render(){
        const {user, auth} = this.props;
        const userType = (( user || {} ).userType || {})
        
        return(
            <div>
                {!user && auth===false && <LandingPage/>}
            
                  {user?
                this.checkType(userType):auth===false
                }
                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
    auth: state.auth.isAuthenticated,
    otp:state.auth.otp

});

export default connect(mapStateToProps,null )(HomePage);