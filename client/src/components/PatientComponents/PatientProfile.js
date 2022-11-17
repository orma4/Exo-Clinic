import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReportsHistorty from './ReportsHistorty';
import AppNavbar from '../GeneralComponents/AppNavbar';
import suite from "../GeneralComponents/Auth/validate";
import { clearErrors } from '../../actions/errorActions';
import { update, userIsExsist } from '../../actions/authActions';
import noPic from "../../assets/images/no-pic.jpeg";
import Input from '../GeneralComponents/Auth/Input'
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
} from 'reactstrap'
import FileUpload from '../GeneralComponents/FilesComponents/FileUpload';
import { getPatientAppointments } from '../../actions/appointmentActions';
import DocumentsTab from './DocumentsTab';
import classNames from 'vest/classNames';

const PatientProfile = (props) => {
  const idMatch = String(props.match.params.id)
  const [isExsist,setIsExsist]=useState(null)
      if(props.user.userType === 'doctor'){
        var user = props.users&& (props.users).find(user => user._id === idMatch);
      }
      else  {
        var {user} = props;
      }
  const
  {
    id,
    _id,
    name,
    email,
    phone,
    
  } = user||{ };

    const [userState,setUserState]=useState({email:email,
        id:id||_id,
        name:name,
        phone:phone
       })
  const [tab, setTab] = useState(0);
  const [modal,setModal]=useState(false)
   
   useEffect(() => {
     async function fetchData() {
      if(!isExsist)
      setIsExsist(await  props.userIsExsist(idMatch))
        
  }
  fetchData();
    props.getPatientAppointments(idMatch);
    
 }, [])
 



  const handleClick = (e) => {
    const id = parseInt(e.target.id.split('-')[1]);
    setTab(id);
  };


  const toggle = () => {
    props.clearErrors();
    setModal(!modal);
};
  const renderTab = () => {
    switch (tab) {
      case 0:
        return <ReportsHistorty/>;
      case 1:
        return <DocumentsTab documents={user.documents}/>;
      default:
        return 0;
    }
  };

 PatientProfile.propTypes={
    update:PropTypes.func.isRequired,
    clearErrors:PropTypes.func.isRequired

}
const onSubmit=(e)=>{
            let {name} = userState;
            name=name.toLowerCase();
            name=name.split(" ").map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
            e.preventDefault();
            props.update({...userState,name: name,image:props.image ? props.image:userState.image});
            toggle();
}

const runValidate = async (key, value) => {
  await suite({  [key]: value }, key);
};


const onChange =async(e) => {
 const {
   target: { value, name }
 } = e;
 setUserState({...userState, [name]: value});
runValidate(name,value)
}

const result = suite.get();
const cn = classNames(result, {
  warning: "warning",
  invalid: "invalid",
  valid: "valid"
});

  return (
    <div className="DoctorDetail">
      <AppNavbar backBtn={props.history.goBack} bg="#266a61" title="Details" />
      {isExsist===false&&<Redirect to={"/404"}/>}
      {user&&<div>
          <div className="detail-card">
            <div className="UserDetail-info">
            <h4 className="title text-white font-weight-bold">
                {name}
              </h4>
              <div className="d-flex justify-content-center align-items-center">
                <img className="avatar" src={user.image?user.image:noPic} alt="Avatar" />
              </div>
              <div className="d-flex exp">
                <p >{`${email}`}</p>
                <p>
                </p>
              </div>
              {phone&&
              <div className="d-flex exp">
                <p>{`${phone}`}</p>
              
              </div>
}
                {props.user.userType==="patient"&&<Button onClick={toggle}
            className="profile-update"
            color="primary"
          >
            Update Profile
          </Button>}
            </div>
          </div>
          
          <div className="container d-flex tab-content">
            <button
              type="submit"
              className={`tab flex-grow-1 ${tab === 0 ? 'tab-focus' : ''}`}
              id="tab-0"
              onClick={e => handleClick(e)}
            >
              History 
            </button>
     
            <button
              type="submit"
              className={`tab flex-grow-1 ${tab === 1 ? 'tab-focus' : ''}`}
              id="tab-1"
              onClick={e => handleClick(e)}
            >
              Documents tab
            </button> 
          </div>
          {renderTab(props.user)}
        
        </div>
}
        <Modal 
                isOpen={modal}
                toggle={toggle}>
                    <ModalHeader 
                    toggle={toggle}>
                    Update Profile
                    </ModalHeader>
                        <ModalBody>
                           <FileUpload type="image"/>
                          <Form onSubmit={onSubmit}>
                              <FormGroup>
                                <Input
                                  type='name'
                                  name='name'
                                  id="name"
                                  className={userState.name? cn("name"): "untested"}
                                  onChange={onChange}
                                  value={userState.name}
                                  errors={userState.name? result.getErrors("name") : []}/>
                                <br/>
                                <Input
                                  type='tel'
                                  name='phone'
                                  id="phone"
                
                                  className={userState.phone? cn("phone"): "untested"}
                                  onChange={onChange}
                                  value={userState.phone}
                                  errors={userState.phone? result.getErrors("phone") : []}/>


                                  <Button
                                  color="dark"
                                  style = {{marginTop: '2rem'}}
                                  disabled={result.hasErrors()}
                                  block
                                  >
                                      Update</Button>
    
                              </FormGroup>
                              </Form>  
                        </ModalBody>
                </Modal>
    </div>
  );
};
const mapStateToProps = state => ({
  appointments: state.appointment.appointments,
  user: state.auth.user,
  users: state.auth.users,
  image:state.upload.image,
  error: state.error,

});

export default connect(mapStateToProps,{clearErrors,update,userIsExsist,getPatientAppointments})(PatientProfile);
