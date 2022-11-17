import React, { useState } from "react";
import classNames from "vest/classNames";
import suite from "./validate";
import "./styles.scss";
import Input from "./Input.js";
export default function Form(props) {
  const [formState, setFormState] = useState({userType: 'patient', checked: false});
  const [emailPending, setEmailPending] = useState(null);

  const runValidate = async (key, value) => {
    const res = await suite({ ...formState, ...(key && { [key]: value }) }, key);

    // email gets special treatment because of the
    // async validations it has
    if (key === "email") {
      setEmailPending(true);
      res.done(() => {
        setEmailPending(false);
      });
    }
  };

  const handleChange = (e) => {
    const {
      target: { value, name }
    } = e;
    if(name==="password")
    setFormState((state) => ({ ...state,confirm_password:"", [name]: value }));
    else{
      setFormState((state) => ({ ...state, [name]: value }));

    }
    runValidate(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runValidate();
    const {name, email, password, userType } = formState;
    props.onSubmit(name, email, password, userType);

  };

  const handleCheckBox = () => {
    if(formState.checked === false){
        setFormState({...formState, userType: "doctor", checked: !formState.checked});
    }
        
    if(formState.checked === true) { 
      setFormState({...formState, userType: "patient", checked: !formState.checked});
    } 
};



  const result = suite.get();

  const cn = classNames(result, {
    warning: "warning",
    invalid: "invalid",
    valid: "valid"
  });

  return (
    <div className="container">
    <form
      onSubmit={handleSubmit}
      id="example-form"
      className="col-xs-10 col-lg-6"
      className="form-horizontal"
    >
      <div className="form-group">

      <div className="col-sm-10">
      <Input
        name="email"
        label="Email"
        icon="envelope"
        pending={emailPending}
        value={formState.email}
        onChange={handleChange}
        errors={formState.email? result.getErrors("email"): []}
        className={formState.email? cn("email") : "untested"}
      />
      </div>

      <div className="col-sm-10">
      <Input
        name="name"
        label="Name"
        value={formState.name}
        onChange={handleChange}
        className={formState.name? cn("name"): "untested"}
      //  placeholder="try: ealush"
        errors={formState.name? result.getErrors("name") : []}
      />
      </div>

      <div className="col-sm-10">
      <Input
        name="password"
        label="Password"
        value={formState.password}
        onChange={handleChange}
        className={formState.password? cn("password") : "untested"}
        errors={formState.password? [
          ...result.getErrors("password"),
          ...result.getWarnings("password")
        ] : []}
      />
      </div>

      <div className="col-sm-10">
      <Input
        name="confirm_password"
        label="Confirm Password"
        value={formState.confirm_password}
        onChange={handleChange}
        errors={formState.confirm_password? result.getErrors("confirm_password") : []}
        className={formState.confirm_password? cn("confirm_password") : "untested"}
      />
      </div>
   
      <div className="col-sm-10">
      {/* <Label>Are you a doctor?</Label> */}
      <label>Are you a doctor?   </label>
          <input type="checkbox"
          checked={formState.checked}
          onChange={handleCheckBox}/>
      </div>
     
      <footer>
        <button className="btn-submit" disabled={!result.isValid()||!formState.confirm_password}>
          Submit
        </button>
      </footer>
      </div>
    </form>
    </div>
  );
}

