import React, { useState } from "react";
import axios from "axios";
import {
    Button,
    Form,
    Input,
    Row
} from 'reactstrap'
import { forgot } from '../../../actions/authActions';
import {withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

const LoginForgot = () => {

    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);





    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
  
    const forgotPasswordHandler = async (e) => {
      e.preventDefault();
  
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
  
      try {
        const { data } = await axios.post(
          "/api/users/forgotpassword",
          { email },
          config
        );
  
        if(data.error){
          alert(data.error)
        }
        else{
          setSuccess(data.data);
          setEmailSent(true);
        }
        
      } catch (error) {
        setError(error.response.data.error);
        setEmail("");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
  
    let body;
    if (emailSent) {
        body = (
            <span>An email with reset instructions is on its way</span>
        );
    } else {
        body = (
            <Form onSubmit={forgotPasswordHandler}>
                <Row>
                    <Input
                        name="email"
                        placeholder="email"
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Row>
                <Row>
                    <Button>Get reset link</Button>
                </Row>
            </Form>
        );
    }

    return (
        body
    );
};

export default withRouter(connect(null, {forgot})(LoginForgot));