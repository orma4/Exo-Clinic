import React from 'react';
import { connect } from 'react-redux';
import { Table } from "../DoctorComponent/Dashboard/Table";

const ReportsHistorty = (props) =>{
  function todayConvert() {
		var dateString = new Date();
        let month = dateString.toLocaleString('en-us', { month: 'short' });
        var day = String(dateString.getDate());
		return [month, parseInt(day)+",",dateString.getFullYear()].join(" ");
    }
    
     
    const dateComapre = (date) => { 
        var today = todayConvert();

        if (Date.parse(today) >= Date.parse(date) )
            return true;
        else
            return false;
    }
    var rows=props.appointments.filter(appointment=>dateComapre(appointment.date)).sort((a,b)=>{ 
      return (new Date(b.date+ " "+b.time) - new Date(a.date+ " "+a.time))
      ;})
    if(props.patientId){
      rows=rows.filter(appointment=>appointment.patient.id===props.patientId)
    }
    
return(
  <div className="DoctorDetail-information container">
    <div className="content">
      {
      props.patientId?
        <Table 
      rows={rows}
      columns={props.appointmentsHistoryTable.columns}
    />
      :
    <Table 
      rows={rows}
      columns={props.columns}/>
    }

    </div>
  </div>
);
}
const mapStateToProps = state => ({
  appointments: state.appointment.appointments,
  user: state.auth.user,
  columns: state.table.reportsTable.columns,
  appointmentsHistoryTable:state.table.appointmentsHistoryTable

  
});

export default connect(mapStateToProps,null)(ReportsHistorty);
