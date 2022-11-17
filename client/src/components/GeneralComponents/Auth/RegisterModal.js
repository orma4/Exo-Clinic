import React, { Component} from 'react';
import {
    Modal,
    ModalHeader,
    ModalBody,
    NavLink,
} from 'reactstrap'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register,verify } from '../../../actions/authActions';
import { clearErrors } from '../../../actions/errorActions';
import "./styles.scss";
import Form from './Form';

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
        isApproved: true,
        phone: null,
        image: null,
        isFirstRegister:true
    };

    static propTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    };


    componentDidUpdate() {
        const{ isAuthenticated } = this.props;
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


    onSubmit = async ( name, email, password, userType) => {
        var { isFirstTime, isApproved, phone, 
            image, isFirstRegister} = this.state;
        var newUser = {};
        name=name.toLowerCase();
        name=name.split(" ").map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');


        if (userType === 'doctor'){
            newUser = {
                name,
                email,
                password,
                userType,
                isFirstTime,
                isApproved,
                isFirstRegister
            };
        }

        else {
            newUser = {
                name,
                email,
                password,
                userType,
                phone,
                image,
                isFirstRegister
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
                            <Form onSubmit={this.onSubmit}></Form>
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

export default connect(mapStateToProps, {register,verify, clearErrors })(RegisterModal);