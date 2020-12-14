// import React from 'react';
// import AppointmentModal from './AppointmentModal';
// import { Button } from 'reactstrap';

// const InsertField = ({ row, accessor, CustomFunction }) => {

// switch(accessor){
//   case 'name':
//     return row['patient'][accessor]

//   case 'email':
//     const icon = CustomFunction({ email: row['patient'][accessor] });
//     return <span>{ icon } { row['patient'][accessor] }</span>

//   case 'phone':
//     return row['patient'][accessor]

//   case 'image':
//     const clicked = () => CustomFunction({ imageURL: row['patient'][accessor] });
//     return <span style={{height: 200, width: 200, backgroundColor: 'grey'}}>
//             <img onClick={ clicked } src={ row['patient'][accessor] } className="img-fluid" width="200" height="200" alt=''/>
//           </span>

//   case 'action':
//     return (
//       <AppointmentModal id={"ap"+row['_id']} appointment={row} ></AppointmentModal> 
//     )
      
    
//   case 'join':
//     const join = () => {
//        var url = row['_id'];
// 		   window.location.href = `/meeting/${url}`;
//     }
//     return (
//       <Button variant="contained" color="primary" onClick={join} 
//       style={{ margin: "20px" }}>Open Meeting</Button>
//     )

//   default:
//     return 0;
// }


// };

// export default InsertField;





import React from 'react';
import AppointmentModal from './AppointmentModal';
import { Button } from 'reactstrap';

const InsertField = ({ row, accessor, CustomFunction }) => {

switch(accessor){
  case 'name':
    if(row['patient']){
      return row['patient'][accessor]
    }
    return row[accessor]

  case 'email':
    if(row['patient']){
    const icon = CustomFunction({ email: row['patient'][accessor] });
    return <span>{ icon } { row['patient'][accessor] }</span>
    }
    const icon = CustomFunction({ email: row[accessor] });
    return <span>{ icon } { row[accessor] }</span>
    


  case 'phone':
    if(row['patient']){
    return row['patient'][accessor] 
    }
    return row[accessor]

  case 'image':
    
    const clicked = () =>{
      if(row['patient']){
      CustomFunction({ imageURL: row['patient'][accessor] });
      return;
    }
     CustomFunction({ imageURL: row[accessor] });
  }
    return <span style={{height: 200, width: 200, backgroundColor: 'grey'}}>
            <img onClick={ clicked } src={ row['patient']?row['patient'][accessor]:row[accessor] } className="img-fluid" width="200" height="200" alt=''/>
          </span>
    

  case 'action':
    return (
      <AppointmentModal id={"ap"+row['_id']} appointment={row} ></AppointmentModal> 
    )
      
    
  case 'join':
    const join = () => {
       var url = row['_id'];
		   window.location.href = `/meeting/${url}`;
    }
    return (
      <Button variant="contained" color="primary" onClick={join} 
      style={{ margin: "20px" }}>Open Meeting</Button>
    )

  default:
    return 0;
}


};

export default InsertField;