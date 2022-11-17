import React from 'react';
import { connect } from 'react-redux';
import noPic from "../../assets/images/no-pic.jpeg";

const DocumentsTab = (props) =>{

return(
  

 <div className="DoctorDetail-feedback container">

    {props.documents&&(props.documents[0])?(props.documents.reverse().map((document,index)=>{if(document&&document.document&&document.fileName){
    const doctor=props.users.find(user=>user._id===document.docId)
    return(doctor&&
        <div key={index} className="Doctor">
        <div className="d-flex">
          <div className="Doctor-img">
            <img src={doctor.image?doctor.image:noPic} alt="Avatar" />
          </div>
          <div className="Doctor-info d-flex justify-content-between w-100">
            <div>
            <h6 className="Feedback-title"> Dr.&nbsp;{doctor.name}</h6>
            <a href={document.document}  >{document.fileName}</a>
              {document.date&&<p className="Doctor-feedback-date"> {document.date.slice(0,10)}</p>}
              
            </div>
            
          </div>
        </div>
        
      </div>
      ) 
      }
    }
        
        ))
        :
        <div>
        <h6 className="Feedback-title">No Documents Yet</h6>
        </div>
    }
    
  </div>
)} ;
const mapStateToProps = state => ({
  user: state.auth.user,
  users:state.auth.users,
  singleDoctor:state.doctor.singleDoctor
});

export default connect (mapStateToProps,null)(DocumentsTab);
