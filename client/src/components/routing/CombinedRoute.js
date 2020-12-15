import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const CombinedRoute = ({ component: Component, authenticated, ...rest }) => {
  console.log("combinedroute")

  return (
    <div>
      {authenticated && (
    <Route
      {...rest }
      render= { props =>
        (authenticated) ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
      )}  
    </div>
  );
};

CombinedRoute.propTypes = {
  authenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
  authenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(CombinedRoute);
