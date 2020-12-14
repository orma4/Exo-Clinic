import React from 'react';
import { useForm } from 'react-hook-form'

const StatusModal = (props) => {
  const { handleSubmit, register} = useForm()
    const onSubmit = (data, e) => {
        fetch('https://doctors-portal-srv.herokuapp.com/updateStatus', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(res => res.json())
          .then(data => {
            alert("Update Successful")
            window.location.reload();

          })  

    }
    return (
        <div className="modal fade" id={props.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="col-12 modal-title text-center primary-color font-weight-bold" id="exampleModalLongTitle">Update Status</h5>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form" id="form">
                            <div className="form-group d-none">
                                <input type="text" value={props.appointment._id} className="form-control text-uppercase" name="id" ref={register({ required: true })}/>
                            </div>
                            <div className="form-group">
                                <select id="inputState" name="status" className="form-control text-uppercase" ref={register({ required: true })}>
                                    <option>approved</option>
                                    <option>cancelled</option>
                                </select>
                            </div>
                        </div>
                        <div className="d-flex flex-items justify-content-end">
                            <button type="button" className="btn btn-secondary px-5 mr-3" data-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary text-uppercase primary-btn px-5">Update</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
};

export default StatusModal;