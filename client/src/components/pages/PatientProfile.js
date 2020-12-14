import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DoctorInfo from '../DoctorInfo';
import AppNavbar from '../AppNavbar';

//import callAnswer from '../../assets/images/call-answer.png';
import { clearErrors } from '../../actions/errorActions';
import { update } from '../../actions/authActions';

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap'
import FileUpload from '../FilesComponents/FileUpload';

const PatientProfile = (props) => {
    const { user } = props || props.location.state

  const
  {
    id,
    name,
    email
  } = user||{ };

    const [userState,setUserState]=useState({email:email,
        id:id,
        name:name,
       })
  const [tab, setTab] = useState(0);
  const [modal,setModal]=useState(false)


  const handleClick = (e) => {
    const id = parseInt(e.target.id.split('-')[1]);
    setTab(id);
  };


  const toggle = () => {
    //Clear Errors
    props.clearErrors();
    setModal(!modal);
};
  const renderTab = () => {
    switch (tab) {
      case 0:
        return <DoctorInfo/>;  ////////////////////////////////////////////changeeeeeeeee
    //   case 1:
    //     return <ClinicInfo phone={phone} address={address} />;
    //   case 2:
    //     return <DoctorFeedback />;
      default:
        return 0;
    }
  };
  const onChange = (e) => {
    setUserState({...userState, [e.target.name]: e.target.value});
}
 PatientProfile.propTypes={
    update:PropTypes.func.isRequired,
    clearErrors:PropTypes.func.isRequired

}
const onSubmit=(e)=>{
            e.preventDefault();
            console.log(userState)
            props.update(userState);
            toggle();
}

  return (
    <div className="PatientProfile">
      <AppNavbar bg="#266a61" title="Details" backBtn="/" />
      {user&&<div>
          <div className="detail-card">
            <div className="UserDetail-info">
              <h4 className="title text-black font-weight-bold">
                {`User Profile`} 
              </h4>
              <div className="d-flex justify-content-center align-items-center">
                {/* <img className="cta" src={callAnswer} alt="Call Answer" /> */}
                <img className="avatar" src={user.image} alt="Avatar" />
                {/* <img className="cta" src={email} alt="email" /> */}
              </div>
              {/* <p className="category">{singleDoctor.category}</p> */}
              <div className="container">
                <p>{`${email}`}</p>
                <p>{`${name}`}</p>
                <p>
                  {/* <img src={like} alt="likes" /> */}
                  {/* <span>{singleDoor.likes}</span> */}
                </p>
              </div>
            </div>
          </div>
          
          <div className="container d-flex tab-content">
            <button
              type="submit"
              className={`tab flex-grow-1 ${tab === 0 ? 'tab-focus' : ''}`}
              id="tab-0"
              onClick={e => handleClick(e)}
            >
              Patient Info
            </button>
            {/* <button
              type="submit"
              className={`tab flex-grow-1 ${tab === 1 ? 'tab-focus' : ''}`}
              id="tab-1"
              onClick={e => handleClick(e)}
            >
              Clinic Info
            </button>
            <button
              type="submit"
              className={`tab flex-grow-1 ${tab === 2 ? 'tab-focus' : ''}`}
              id="tab-2"
              onClick={e => handleClick(e)}
            >
              Feedback
            </button> */}
          </div>
          {renderTab(props.user)}
          <Link onClick={toggle}
            className="book-btn"
          >
            Update Profile
          </Link>
        </div>
}
        <Modal 
                isOpen={modal}
                toggle={toggle}>
                    <ModalHeader 
                    toggle={toggle}>
                    User Profile Update
                    </ModalHeader>
                        <ModalBody>
                            {/* { this.UserState.msg ? ( 
                            <Alert color='danger'> {this.UserState.msg} </Alert> 
                            ) : null} */}
                           <FileUpload/>
                          <Form onSubmit={onSubmit}>
                              <FormGroup>
                                {/* <Label for='email'>
                                      Email
                                  </Label>
                                  <Input
                                  type='email'
                                  name='email'
                                  id="email"
                                  
                                  className="mb-3"
                                  onChange={onChange}
                                  defaultValue={UserState.email}/> */}
                               
                                <Label for='name'>
                                      name
                                  </Label>
                                  <Input
                                  type='name'
                                  name='name'
                                  id="name"
                                  className="mb-3"
                                  onChange={onChange}
                                  defaultValue={userState.name}/>
                                
                                  <Button
                                  color="dark"
                                  style = {{marginTop: '2rem'}}
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

  user: state.auth.user,
  error: state.error,

});

export default connect(mapStateToProps,{clearErrors,update})(PatientProfile);
