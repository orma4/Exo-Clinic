import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const PatientPrivateRoute = ({ component: Component, location,history, authenticated,user, ...rest }) => {
  return (
    <div>
      { authenticated===false&&<Redirect to="/" />}
      {authenticated && (
    <Route
      {...rest }
      render= { props =>
        (authenticated&&user.userType==="patient" ) ? (
          <Component location={location} history={history} {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
      )}  
    </div>
  );
};

PatientPrivateRoute.propTypes = {
  authenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  authenticated: state.auth.isAuthenticated,
  user:state.auth.user
});

export default connect(mapStateToProps)(PatientPrivateRoute);
