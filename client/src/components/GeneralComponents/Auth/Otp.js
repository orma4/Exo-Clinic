import React, { Component ,Fragment } from 'react';
import { authenticator } from 'otplib';
import styles from './TokenValidate.module.css';
import { connect } from 'react-redux';
import { otpEmail } from '../../../actions/authActions';
const newSecret=authenticator.generateSecret()
const Pass = props => <span className={styles.pass}>{props.value}</span>;
const Fail = props => <span className={styles.fail}>{props.value}</span>;
const Message = ({delta, token }) => {
 
  if (!token) {
    return 'Please input a token.';
  }

  if (!delta) {
    return <Fail value="The token is invalid." />;
  }

  if (delta === true) {
    return (

      <Fragment>
        The token <Pass value="is valid" /> in this current window.
      </Fragment>
    );
  }

  return (
    <Fragment>
      The token <Fail value="was valid" /> at {delta} window(s).
    </Fragment>
  );
};

class Otp extends Component {
  state = {
    text: {
        recipient: '',
    token:authenticator.generate(newSecret),
    },
    verifyToken:'',
    isSent:false,
    delta:false

    }
  

  checkOtp = () => {
    if(this.state.verifyToken===this.state.text.token){ 
        this.props.onClick(this.props.user)
      this.props.onClose()
    }
    
    else{
      alert('Wrong token!')
    }
    
  }
  sendOtpText = () => {
    this.props.otpEmail(this.state.text.token);
    this.setState({isSent:true})
  }
  render() {
    return (
      <div className="App">
        {this.state.isSent? <div style={{ marginTop: 10 }} >
          <h2> Enter the otp token </h2>
          <br />
          <input
          className={styles.input}
          onChange={evt => this.setState({verifyToken:evt.target.value})}
          maxLength={6}
          value={this.state.verifyToken}
          placeholder="000000"
        />
       
       <button onClick={this.checkOtp}> Submit </button>
       <Message delta={this.state.verifyToken===this.state.text.token} token={this.state.text.token}  />
        </div>
        :<div>{this.sendOtpText()}</div>
        }
      </div>
    );
  }
}

export default connect(null,{otpEmail}) (Otp);
