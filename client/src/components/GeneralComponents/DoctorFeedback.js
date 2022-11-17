import React, { useState} from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { addDoctorFeedback } from "../../actions/doctorActions"; 
import { connect } from 'react-redux';
import moment from 'moment';
import noPic from "../../assets/images/no-pic.jpeg";

const DoctorFeedback = (props) =>{
 const [feedback, setFeedback] = useState({feedback:"",id:props.singleDoctor._id,patientId:props.user.id,date:String(moment(new Date()).format('YYYY-MM-DD'))});
  const [modal, setModal] = useState(false);
  const [feedbacks, setFeedbacks] = useState([...props.singleDoctor.feedbacks].reverse());
  const onChange = (e) => {

    setFeedback({...feedback, [e.target.name]: e.target.value});
    }
      const onSubmit = () => {
         props.addDoctorFeedback(feedback);
         setFeedbacks([feedback,...feedbacks])
         toggle();
         
      
      };
      const toggle = () => {
        setFeedback({...feedback,feedback:""});
        setModal(!modal);
    };

return(
 <div className="DoctorDetail-feedback container">
  { props.user.userType === "patient" &&<button data-toggle="modal" onClick={toggle} className="btn btn-warning text-light"> 
    <span className="fa fa-plus btn btn-warning text-light"/> 
    </button> 
}

    <Modal
                isOpen={modal}
                toggle={toggle}>
                    <ModalHeader 
                    toggle={toggle}>
                    Add Feedback
                    </ModalHeader>
                        <ModalBody>
                        <Form onSubmit={onSubmit}>
                              <FormGroup >
                              <Label for='feedback'>
                                      feedback
                                  </Label>
                                  <Input
                                  type='text'
                                  name='feedback'
                                  id="feedback"
                                  className="mb-3"
                                  onChange={onChange}
                                  placeholder="Enter doctor's Feedback"
                                  />
                                    <div>
                                  <Button
                                  color="primary"
                                  onClick={onSubmit}
                                  variant="contained"
                                  size="large"
                                  disabled={feedback.feedback===""}
                                  block
                                  >
                                  Add Feedback</Button>
                                  </div>

                                  </FormGroup>
                              </Form>
                        </ModalBody>
                        </Modal>
    {props&&feedbacks.map((feedback,index)=>{
      const user=props.users.find(user=>user._id===feedback.patientId)
      return(
        user&&(
        <div key={index} className="Feedback">
        <div className="d-flex">
          <div className="Doctor-img">
            <img src={user.image?user.image:noPic} alt="Avatar" />
          </div>
          <div className="Doctor-info d-flex justify-content-between w-100">
            <div>
            <h6 className="Feedback-title"> {user.name}</h6>

              <p className="Doctor-feedback"> {feedback.feedback}</p>
              <p className="Doctor-feedback-date"> {feedback.date}</p>   
            </div>
          </div>
        </div>
      </div>
        )
      ) 
      }
        )
    }
    
   
  </div>
)} ;
const mapStateToProps = state => ({
  user: state.auth.user,
  users:state.auth.users,
  singleDoctor:state.doctor.singleDoctor
});

export default connect (mapStateToProps,{addDoctorFeedback})(DoctorFeedback);
