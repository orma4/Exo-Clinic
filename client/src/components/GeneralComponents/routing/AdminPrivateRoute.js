import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const AdminPrivateRoute = ({ component: Component, authenticated,user, ...rest }) => {

  return (
    <div>
      { authenticated===false&&<Redirect to="/" />}
    {authenticated && (
    <Route
      {...rest }
      render= { props =>
        (authenticated&&user.userType==="admin" ) ? 
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

AdminPrivateRoute.propTypes = {
  authenticated: PropTypes.bool,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  authenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps)(AdminPrivateRoute);