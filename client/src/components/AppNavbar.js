import React, {Component, Fragment } from 'react';
import { 
    Collapse,
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    Container, 
    NavbarToggler
} from 'reactstrap';
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class AppNavbar extends Component {
    state = {
        isOpen: false
    }

    static propTypes = {
        auth: PropTypes.object.isRequired
    }

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }


    render(){
        const { isAuthenticated,user } = this.props.auth;
        console.log(user)
        const patientLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>
                            { user ? `Welcome ${user.name}` : ''}
                        </strong> 
                    </span>
                </NavItem>
                <NavItem>
                  <Logout/>
                </NavItem>
                
                <Link
             to={{
                pathname: `/userProfile`,
                state: { user: this.props.auth.user },
              }}
            //   className="d-flex justify-content-center"
            >
              VIEW PROFILE
              </Link>


              <Link
             to={{
                pathname: `/bookings`,
                state: { user: this.props.auth.user },
              }}
            //   className="d-flex justify-content-center"
            >
              VIEW BOOKINGS
              </Link>
            </Fragment>
        );




        
        const doctorLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                        <strong>
                            { user ? `Welcome Dr. ${user.name}` : ''}
                        </strong> 
                    </span>
                </NavItem>
                <NavItem>
                  <Logout/>
                </NavItem>
                
                <Link
             to={{
                pathname: `/bookings`
                //state: { doctor: this.props.singleDoctor },
              }}
            //   className="d-flex justify-content-center"
            >
              VIEW PROFILE
            </Link>
            </Fragment>
        );


        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal/>
                </NavItem>
                <NavItem>
                    <LoginModal/>
                </NavItem>
            </Fragment>
        )

        return (
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                <Container>
                    <NavbarBrand href="/">Happy Clinic</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            { isAuthenticated ? (user.userType === 'patient' ? patientLinks :
                              user.userType === 'doctor' ? doctorLinks : <h6>admin</h6>) 
                              :  guestLinks }
                        </Nav>
                    </Collapse>
                </Container>
            </Navbar>
        </div>
        );
        
    }

}

const mapStateToProps = state => ({
    auth: state.auth,
    singleDoctor:state.doctor.singleDoctor

});

export default connect(mapStateToProps, null)(AppNavbar);