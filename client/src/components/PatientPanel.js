import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


export class PatientPanel extends Component {
    render() {
        return <Redirect to='/hi'/>
    }

}

export default PatientPanel;
