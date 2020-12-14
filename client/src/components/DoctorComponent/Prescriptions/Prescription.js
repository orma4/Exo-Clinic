import React, { useState, useEffect, Fragment } from 'react';
import "./Prescription.css"
import PrescriptionViewModal from '../Dashboard/PrescriptionViewModal';
import spinner from '../../../images/icon/spinner_1.gif'
import PatientModal from './PatientModal';

const Prescription = () => {
    const [appointments, setAppointments] = useState([]);
    useEffect(() => {
        fetch('https://doctors-portal-srv.herokuapp.com/appointments')
            .then(res => res.json())
            .then(data => setAppointments(data))
    }, [])
    const [filterAppointments, setFilterAppointments] = useState([]);
    useEffect(() => {
        var filterArray = []
        appointments.filter(appointment => {
            if (appointment.prescription !== null) {
                filterArray.push(appointment)
            }
        })
        setFilterAppointments(filterArray)
    }, [appointments])
    return (
        <div className="col-md-10 p-4">
            <h2>Prescriptions</h2>
            <div style={{ backgroundColor: "#fff" }} className="my-5 p-3">
                <div className="d-flex flex-items justify-content-between my-5">
                    <h4>All Prescriptions</h4>
                </div>
                        <table id="dashboardTable" className="table border-0">

                            <thead>
                                <tr>
                                    <th scope="col">Sr. No</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Contact</th>
                                    <th scope="col">Prescription</th>
                                    <th scope="col">Add To Patient</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    appointments.length > 0 ?
                                        filterAppointments.length > 0 ?
                                            filterAppointments.map((appointment,index) => {
                                                return <Fragment>
                                                    <tr>
                                                        <th scope="row">{index+1}</th>
                                                        <td>{appointment.date}</td>
                                                        <td>{appointment.name}</td>
                                                        <td>{appointment.phone}</td>
                                                        <td><button data-toggle="modal" data-target={"#prv" + appointment._id} className="btn px-4 bg-btn primary-btn text-light">View</button></td>
                                                        <td><button data-toggle="modal" data-target={"#ptm" + appointment._id} className="btn px-4 bg-btn primary-btn text-light">Add</button></td>

                                                    </tr>
                                                    <PrescriptionViewModal id={"prv" + appointment._id} appointment={appointment}></PrescriptionViewModal>
                                                    <PatientModal id={"ptm" + appointment._id} appointment={appointment}></PatientModal>
                                                </Fragment>

                                            })
                                            :
                                            <tr>
                                                <td className="text-center pt-5" colSpan="6"><h2>No Patients Available</h2></td>
                                            </tr>
                                        :
                                        <tr className="text-center">
                                            <td colSpan="6"><img src={spinner} alt="spinner" /></td>
                                        </tr>

                                }
                            </tbody>
                        </table>
                    </div>
            </div>
    );
};

export default Prescription;