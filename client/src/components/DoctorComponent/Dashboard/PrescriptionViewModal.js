import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form'

const PrescriptionViewModal = (props) => {
    const [editStatus,setEditStatus] = useState(false)
    const { handleSubmit, register,errors} = useForm()
    const onSubmit = (data, e) => {
        fetch('https://doctors-portal-srv.herokuapp.com/updatePrescription', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(res => res.json())
          .then(data => {
            alert("update success")
            window.location.reload();
            
          })  

    }
    return (
        <div className="modal fade" id={props.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="col-12 modal-title text-center primary-color font-weight-bold" id="exampleModalLongTitle">Prescription</h5>
                </div>
                <div className="modal-body">
                   {
                       editStatus === false ?
                       <p>{props.appointment.prescription}</p>
                       :
                       <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="form" id="form">
                                <div className="form-group d-none">
                                    <input type="text" value={props.appointment._id} className="form-control text-uppercase" name="id" ref={register({ required: true, })}/>
                                </div>
                                <div className="form-group">
                                    <textarea defaultValue={props.appointment.prescription}  className="form-control text-capitalize" placeholder="Enter Prescription" rows="18" name="prescription" ref={register({ required: true })}></textarea>
                                    {errors.prescription && <span className="text-danger">Prescription is required</span>}
                                </div>
                            </div>
                            <div className="d-flex flex-items justify-content-end">
                                <button type="button" className="btn btn-secondary px-5 mr-3" data-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary text-uppercase primary-btn px-5">Update</button>
                            </div>
                        </form>
                   }

                </div>
                {
                    editStatus === false &&
                        <div className="modal-footer">
                        <button type="button" className="btn btn-secondary px-5 mr-3" data-dismiss="modal">Close</button>
                        <button onClick={()=>setEditStatus(true)} type="button" className="btn btn-primary text-uppercase primary-btn px-5">Edit</button>
                        </div>
                }
            </div>
        </div>
    </div>
    );
};

export default PrescriptionViewModal;