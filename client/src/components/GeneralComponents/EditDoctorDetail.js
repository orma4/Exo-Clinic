import React, { useState} from 'react';
import '../GeneralComponents/AppointmentModal.css'
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';
import { getSingleDoctor } from '../../actions/patientActions';
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { updateDoctorDetails } from '../../actions/doctorActions';

import { clearErrors } from '../../actions/errorActions';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import FileUpload from '../GeneralComponents/FilesComponents/FileUpload';
const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const EditDoctorDetail = (props) => {
  const classes = useStyles();
  const { errors } = useForm();
  const [modal, setModal] = useState(false);
  let flag=true;
  let isName;
  let isExp;
  let isFee;
  let isPhone;
  let isDes;
 
 let  [doctor,setDoctor]=useState({...props.doctor})
const onChange = (e) => {
setDoctor({...doctor, [e.target.name]: e.target.value});
}
const onSubmit = () => {
  isName= new RegExp(/[a-zA-Z]+/).test(doctor.name)&&!doctor.name.match(/[0-9-!$%^&@#*()_+|~=`{}\[\]:";'<>?,.\/]/)
  isExp=doctor.exp&&Number(doctor.exp)>0&&Number(doctor.exp)<=50&&!doctor.exp.match(/[.]]/)
  isFee=doctor.fee&&Number(doctor.fee)>=0&&Number(doctor.fee)<=1000&&!doctor.fee.match(/[.]/)
  isPhone=new RegExp(/[0-9]{3}[0-9]{3}[0-9]{4}/).test(doctor.phone)&&doctor.phone.length===10
  isDes=doctor.description!==""
  
  flag=isName&&isExp&&isFee&&isPhone&&isDes
    if (flag) {
      let {name} = doctor;
      name=name.toLowerCase();
      name=name.split(" ").map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
      props.updateDoctorDetails({...doctor,name : name, image:props.image?props.image:doctor.image});
      toggle();
    } else {
        if(!isName)
        alert("Name is required to be only alpha letters");
        else if(!isFee)
        alert("Fee is required to be integer Number beetwen 1-1000");
        else if(!isExp)
        alert("Exp is required to be integer Number beetwen 1-50");
        else if(!isPhone)
        alert("phone is required to be in format: (1234567890)");
        else if(!isDes)
        alert("Description cannot be empty");
    }
  
  };
  

  const toggle = () => {
    props.clearErrors();
    setModal(!modal);
};

return (
            doctor && <div>
                  {
                    <button data-toggle="modal" onClick={toggle} className="btn btn-warning text-light"> 
                    <span className="fa fa-pencil btn btn-warning text-light"/> 
                    </button> 
                    }
                    <Modal
                isOpen={modal}
                toggle={toggle}>
                    <ModalHeader 
                    toggle={toggle}>
                    Update Profile
                    </ModalHeader>
                        <ModalBody> 
                           <FileUpload onChangeImage={onchange} type="image"/>
                        <Form >
                             
                        <FormGroup >
                            
                            <div className="form-field">
                            <label htmlFor="fee">Name</label>
                            <input
                              type="text"
                              name="name"
                              id="name"
                              value={doctor.name}
                              onChange={onChange}
                              placeholder="Enter your name"
                              required
                            />
                          </div>                          
                  <div className="form-field">
                            <label htmlFor="description">Address</label>
                            <input
                              type="text"
                              name="address"
                              id="address"
                              value={doctor.address}
                              onChange={onChange}
                              placeholder="Enter doctor's address"
                              required
                            />
                          </div>
                          
                  
                          <div className="form-field">
                            <label htmlFor="fee">Doctor Fee</label>
                            <input
                              type="text"
                              min="1"
                              max="1000"
                              name="fee"
                              id="fee"
                              value={doctor.fee}
                              onChange={onChange}
                              placeholder="Enter doctor's fee"
                              required
                            />
                          </div>
                  
                          <div className="form-field">
                            <label htmlFor="exp">Doctor Experience</label>
                            <input
                              type="text"
                              min="1"
                              max="50"
                              name="exp"
                              id="exp"
                              value={doctor.exp}
                              onChange={onChange}
                              placeholder="Enter doctor's experience"
                              required
                            />
                          </div>
                  
                          <div className="form-field">
                            <label htmlFor="phone">Doctor Phone no.</label>
                            <input
                              type="tel"
                              pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                              name="phone"
                              id="phone"
                              value={doctor.phone}
                              onChange={onChange}
                              placeholder="Enter doctor's phone"
                              required
                            />
                          </div>
                  
                          <div className="form-field">
                            <label htmlFor="education">Education</label>
                            <input
                              type="text"
                              name="education"
                              id="education"
                              value={doctor.education}
                              onChange={onChange }
                              placeholder="Enter doctor's Education"
                              required
                            />
                          </div>
                          <div className="form-field">
                            <label htmlFor="description">Description</label>
                            <input
                              type="text"
                              name="description"
                              id="description"
                              value={doctor.description}
                              onChange={onChange}
                              placeholder="Enter doctor's description"
                              required
                            />
                          </div>
                          <div className="form-field">
                            <label htmlFor="description">Specialization</label>
                            <input
                              type="text"
                              name="specialization"
                              id="specialization"
                              value={doctor.specialization}
                              onChange={onChange}
                              placeholder="Enter doctor's specialization"
                              required
                            />
                          </div>
                          <div className="form-field">
                            <label htmlFor="description">Services Offered</label>
                            <input
                              type="text"
                              name="servicesOffered"
                              id="servicesOffered"
                              value={doctor.servicesOffered}
                              onChange={onChange}
                              placeholder="Enter doctor's services offered"
                              required
                            />
                          </div>
                              {errors.from && <span className="text-danger">description is required</span>}
                                 <div>
                                    <Button
                                    color="primary"
                                    onClick={onSubmit}
                                    className={classes.button}
                                    startIcon={<SaveIcon />}
                                    variant="contained"
                                    size="large"
                                    >
                                    Update Details</Button>
                                    </div>
                            </FormGroup>
                              </Form>  
                        </ModalBody>
                </Modal>
            </div>

)
}
const mapStateToProps = state => ({
    user: state.auth.user,
    singleDoctor:state.doctor.singleDoctor,
    image:state.upload.image
  });
export default connect(mapStateToProps, { updateDoctorDetails,getSingleDoctor, clearErrors,
    })(EditDoctorDetail);
