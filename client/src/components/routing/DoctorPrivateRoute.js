import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const DoctorPrivateRoute = ({ component: Component, authenticated,user, ...rest }) => {

  //const userType = (( user || {} ).userType || {})

  return (
    <div>
    {authenticated && (
    <Route
      {...rest }
      render= { props =>
        (authenticated&&user.userType==="doctor" ) ? 
        (
          <Component {...props} />
        ) :
         (
          <Redirect to="/" />
         )
      }
    />
    )}
    </div>
  );
    
};

DoctorPrivateRoute.propTypes = {
  authenticated: PropTypes.bool,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  authenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(DoctorPrivateRoute);
