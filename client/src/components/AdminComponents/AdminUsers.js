import React, { useEffect } from 'react'
import {
  CCol,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  Modal,
  ModalHeader,
  ModalBody,
} from 'reactstrap';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import{approveDoctor,deleteUser,getUsers} from "../../actions/authActions"
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import noPic from "../../assets/images/no-pic.jpeg";
import { connect } from 'react-redux';
import Otp from '../GeneralComponents/Auth/Otp.js'
import { useState } from 'react';
import AppNavbar from "../GeneralComponents/AppNavbar";


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

      
const AdminUsers = (props) => {
 const classes = useStyles();
 var [modal,setModal]=useState(false)
 var {users}=props;
var [user,setUser]=useState(null)
const {getUsers}=props
useEffect(() => {
    if(!props.users)
    {
      getUsers()
    }
    
},[props.users,getUsers]);
 const handleClickDelete = (user) => {
  props.deleteUser(user);
}

const toggle = () => {
  setModal(!modal);
};

const submit = (user) => {
  setModal(!modal);
  setUser(user)

};
  return (
    <>
    
     <AppNavbar backBtn={props.history.goBack}/>
      <CRow>
        <CCol>
              <br />

              <table className="table ">
                <thead className="thead-light">
                  <tr>
                    <th className="text-center"><CIcon name="cil-people" /></th>
                    <th>User Name</th>
                    <th >Email</th>
                    <th>User Type</th>
                    
                  
                  </tr>
                </thead>
                <tbody>
                  {users&&users.map(user => {
                    return(
                    <tr>
                    <td className="text-center">
                      <div className="c-avatar">
                        <img alt="" src={user.image?user.image:noPic} className="c-avatar-img" />
                        <span className="c-avatar-status bg-success"></span>
                      </div>
                    </td>
                    <td>
                      <div>{user.name}</div>
                      <div className="small text-muted">
                      </div>
                    </td>
                    <td>
                    <div>{user.email}</div>
                    </td>
                    <td>
                      <div className="clearfix">
                        <div className="float-left">
                        {user.userType}
                        </div>
                      </div>
                    </td>
                    
                    <td>

                    <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={()=>submit(user)}
                startIcon={<DeleteIcon />}
              >
                Delete
           </Button>

                    </td>
                  </tr>
                    
                  )})}

                  
                </tbody>
              </table>
        </CCol>
      </CRow>
      
 <Modal
                isOpen={modal}
                toggle={toggle}>
                    <ModalHeader 
                    toggle={toggle}>
                    Delete User
                    </ModalHeader>
                        <ModalBody>
                        <Otp user={user} onClose={toggle} onClick={handleClickDelete} />
                        </ModalBody>
                        </Modal>
    </>
  )
}
const mapStateToProps = state => ({
  users: state.auth.users&& state.auth.users.filter(user=>{return user.userType!=="admin"}),
});

export default connect(mapStateToProps, {getUsers,approveDoctor,deleteUser} )(AdminUsers)