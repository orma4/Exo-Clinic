import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { getUsers } from '../../actions/authActions';
import { addDocument } from '../../actions/patientActions';
import { getUserImage } from '../../actions/uploadActions';
import FileUpload from './FilesComponents/FileUpload';
import AppointmentModal from './AppointmentModal';

const InsertField = ({ row, accessor, CustomFunction,getUsers,users}) => {
  const [showModal,setModal]=useState(false);
	const closeChat = () => setModal(false)

  useEffect(() => {
   
    if(!users){
     getUsers();
    }
    
  }, [users])

  const getUser=(id)=>{
       var user=null;
       user=users.find((user)=>{
         return user._id===id
       })
       if(user){
           return user
       }
  }


switch(accessor){
  case 'patientFirstName':
    if(row['patient']){
      return users&& getUser(row['patient']['id']).name
    }
    return users&& getUser(row['id']).name

    case 'doctorFirstName':
      if(row['doctor']){
        return users&& getUser(row['doctor']['_id']).name
      }
      return users&& getUser(row['id']).name

  case 'email':
    if(row['patient']){
    const icon = CustomFunction({ email: users&& getUser(row['patient']['id']).email });
    return <span>{ icon } { users&& getUser(row['patient']['id']).email }</span>
    }
    const icon = CustomFunction({ email: users&& getUser(row['id']).email });
    return <span>{ icon } { users&& getUser(row['id']).email }</span>
    

  case 'phone':
    if(row['patient']){
    return users&& getUser(row['patient']["id"])[accessor] 
    }
    return users&& getUser(row['id'])[accessor]

  case 'image':
    const getImage=(id)=>{
       var user=null;
       if(users){
         user=users.find((user)=>{
           return user._id===id
         })
         if(user){
             return user.image
         }
       
       }
      
    }
    const clicked = () =>{
      if(row['patient']){
      CustomFunction({ imageURL:getImage(row['patient']['id'])
    });
      return;
    }
     CustomFunction({ imageURL: row[accessor] });
  }
    return <span style={{height: 200, width: 200, backgroundColor: 'grey'}}>
            <img onClick={ clicked } src={ row['patient']?getImage(row['patient']['id']):row[accessor] } className="img-fluid" width="200" height="200" alt=''/>
          </span>
    

  case 'action':
    return (
      <AppointmentModal id={"ap"+row['_id']} appointment={row} ></AppointmentModal> 
    )
      
    
  case 'join':   
    var url = row['_id'];
    return(
      <Link to={{pathname:`/video/${url}`,state:row}} variant="contained" color="primary" 
      style={{ margin: "20px" }}
      className="book-btn"
      >
        Open Meeting
        </Link>
      )

    case 'report':
      return(
         <div>
               <Button variant="contained" color="primary" onClick={()=>setModal(true)} 
              style={{ margin: "20px" }}>View Report </Button>
              <Modal show={showModal} onHide={closeChat} style={{ zIndex: "999999" }}>
							<Modal.Header closeButton>
								<Modal.Title>Report</Modal.Title>
							</Modal.Header>
							<Modal.Body style={{ overflow: "auto", overflowY: "auto", height: "400px", textAlign: "left" }}>
                <p>{row['report']}</p>
							</Modal.Body>
            </Modal>
         </div>
      )

      case 'viewProfile':   
      const userProfile= users&& users.find(user=>user._id===row["id"])
      return(
        // <Link to={{pathname:`/userProfile/${row["id"]}`,state:{ user: userProfile }}} variant="contained" color="primary" 
        // style={{ margin: "20px"}}>
        //   View Profile
        //   </Link>

      <Link  to={{
        pathname:`/userProfile/${row["id"]}`,state:{ user: userProfile }
      }}
      className="book-btn"  >
        View Profile</Link>
        )
      case 'upload':   
        return(
              <div>
              <Button variant="contained" color="primary" onClick={()=>setModal(true)} 
              style={{ margin: "20px" }}>Upload </Button>
              <Modal show={showModal} onHide={closeChat} style={{ zIndex: "999999" }}>
							<Modal.Header closeButton>
								<Modal.Title>Upload File</Modal.Title>
							</Modal.Header>
							<Modal.Body style={{ overflow: "auto", overflowY: "auto", height: "400px", textAlign: "left" }}>
                 <FileUpload type="document" closeChat={closeChat} patientId={row["id"]}/>     
							</Modal.Body>
            </Modal>
          </div>
          )
          
  default:
    return 0;
}
};
const mapStateToProps=(state)=>({
  image:state.upload.image,
  fileName:state.upload.fileName,
  users: state.auth.users && state.auth.users
})
export default connect(mapStateToProps,{addDocument,getUsers,getUserImage}) (InsertField);
