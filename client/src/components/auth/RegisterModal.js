import React, { Component} from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert
} from 'reactstrap'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from '../../actions/authActions';
import { clearErrors } from '../../actions/errorActions';



class RegisterModal extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: '',
        userType: 'patient',
        checked: false,
        msg: null, 
        isFirstTime: true,
        isApproved: false,
        phone: null,
        image: null,
        recommendations: null
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };


    componentDidUpdate(prevProps) {
        const{ error, isAuthenticated } = this.props;
        if(error !== prevProps.error){
            //Check for register error
            if(error.id === 'REGISTER_FAIL'){
                this.setState({ msg: error.msg.msg });
            } else {
                this.setState({ msg: null});
            }
        }

        //If authenticated close modal
        if(this.state.modal){
            if(isAuthenticated) {
                this.toggle();
            }
        }
    }

    
    toggle = () => {
        //Clear Errors
        this.props.clearErrors();
        this.setState({
            modal: !this.state.modal,
            checked: false
        });
    };


    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value});
    }

    HandleCheck = e => {
        if(this.state.checked === false){
            this.setState({userType: "doctor"});
            this.setState({checked: !this.state.checked});
        }
            
        if(this.state.checked === true) { 
            this.setState({userType: "patient"});  
            this.setState({checked: !this.state.checked});  
        }

       
    };




    onSubmit = e => {
        e.preventDefault();
        const { name, email, password, userType, isFirstTime, isApproved, phone, image, recommendations} = this.state;
        var newUser = {};
        if (this.state.userType === 'doctor'){
            newUser = {
                name,
                email,
                password,
                userType,
                isFirstTime,
                isApproved,
                recommendations
            };
        }

        else {
            newUser = {
                name,
                email,
                password,
                userType,
                phone,
                image
            };
    }
        this.props.register(newUser);
    };


    render(){
        return (
            <div>
              <NavLink onClick={this.toggle} href='#'>
                  Register
              </NavLink>
                <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}>
                    <ModalHeader 
                    toggle={this.toggle}>
                    Register
                    </ModalHeader>
                        <ModalBody>
                            { this.state.msg ? ( 
                            <Alert color='danger'> {this.state.msg} </Alert> 
                            ) : null}
                          <Form onSubmit={this.onSubmit}>
                              <FormGroup>
                                  <Label for='name'>
                                      Name
                                  </Label>
                                  <Input
                                  type='text'
                                  name='name'
                                  id="name"
                                  placeholder="Name"
                                  className="mb-3"
                                  onChange={this.onChange}/>

                                <Label for='email'>
                                      Email
                                  </Label>
                                  <Input
                                  type='email'
                                  name='email'
                                  id="email"
                                  placeholder="Email"
                                  className="mb-3"
                                  onChange={this.onChange}/>

                                <Label for='password'>
                                      Password
                                  </Label>
                                  <Input
                                  type='password'
                                  name='password'
                                  id="password"
                                  placeholder="Password"
                                  className="mb-3"
                                  onChange={this.onChange}/>
                                
                                <Label>Are you a doctor?</Label>
                                <input type="checkbox"
                                checked={this.state.checked}
                                onChange={this.HandleCheck}/>
                               
                                  <Button
                                  color="dark"
                                  style = {{marginTop: '2rem'}}
                                  block
                                  >
                                 Register</Button>

                              </FormGroup>
                              </Form>  
                        </ModalBody>
                </Modal>
            </div>
        )
    }


}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
});

export default connect(mapStateToProps, {register, clearErrors })(RegisterModal);