import React from 'react';
import { useForm } from 'react-hook-form'

const PatientModal = (props) => {
  const { register, handleSubmit, errors } = useForm()
  const onSubmit = (data,e) => { 
    fetch('https://doctors-portal-srv.herokuapp.com/addPatient', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          .then(res => res.json())
          .then(data => {
            alert("Patient Added Successfully")
            e.target.reset();
            window.location.reload();
          })      
    
  };

  return (
    <div className="modal fade" id={props.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="col-12 modal-title text-center primary-color font-weight-bold" id="exampleModalLongTitle">Add To Patients</h5>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form" id="form">
                <div className="form-group">
                  <input defaultValue={props.appointment.name} type="text" className="form-control text-uppercase" name="name" placeholder="your name" ref={register({ pattern: /^[A-Za-z ]+$/i, required: true })} />
                  {errors.name && <span className="text-danger">Name is required</span>}
                </div>
              </div>
              <div className="form-group">
                <input defaultValue={props.appointment.phone} type="tel" className="form-control text-uppercase" name="phone" placeholder="phone number" ref={register({ pattern: /^[0-9]+$/i, required: true })} />
                {errors.phone && <span className="text-danger">Phone Number is required</span>}
              </div>
              <div className="form-group">
                <input defaultValue={props.appointment.email} type="email" className="form-control text-uppercase" name="email" placeholder="email address" ref={register({ required: true })} />
                {errors.email && <span className="text-danger">Email address is required</span>}
              </div>
              <div className="row">
                <div className="form-group col-6">
                  <input type="number" className="form-control text-uppercase" name="age" placeholder="Enter Age" ref={register({ pattern: /^[0-9]+$/i, required: true })} />
                  {errors.age && <span className="text-danger">Age is required</span>}
                </div>
                <div className="form-group col-6">
                <div className="input-group">
                  <input type="number" className="form-control text-uppercase" name="weight" placeholder="Enter Weight" ref={register({ pattern: /^[0-9]+$/i, required: true })} />
                  <div className="input-group-append d-block">
                    <span className="input-group-text">KG</span>
                  </div>
                </div>
                {errors.weight && <span className="text-danger">Weight is required</span>}
                </div>
              </div>
             <div>
               <h5>Gender: </h5>
             <div className="form-check form-check-inline">
                <label className="form-check-label">
                <input name="gender" className="form-check-input" type="radio" value="male"  ref={register({ required: true })}/>
                  Male</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label">
                <input name="gender" className="form-check-input" type="radio" value="female"  ref={register({ required: true })}/>
                  Female</label>
              </div>
              <div className="form-check form-check-inline">
                <label className="form-check-label">
                <input name="gender" className="form-check-input" type="radio" value="others"  ref={register({ required: true })}/>
                  Others</label>
              </div>
              {errors.gender && <span className="text-danger">Gender is required</span>}
             </div>
             <div className="form-group">
               <textarea  className="form-control text-uppercase" placeholder="Address : e.g- South Gazirchat, Savar, Dhaka" name="address" ref={register({ required: true })}></textarea>
                {errors.address && <span className="text-danger">Address is required</span>}
              </div>
              <button type="submit" className="btn btn-primary text-uppercase primary-btn px-5 float-right">Send</button>
            </form>



          </div>

        </div>
      </div>
    </div>
  );
};

export default PatientModal;