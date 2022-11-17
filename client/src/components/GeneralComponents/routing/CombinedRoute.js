import React, { useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { appointmentIsExist } from '../../../actions/appointmentActions';
import Video from '../Video';

const CombinedRoute = ({ component: Component,computedMatch ,appointmentIsExist,authenticated, ...rest }) => {
const url= computedMatch.params.url
const [urlIsExist,setUrlIsExist]=useState(null)
useEffect(async()=>{
  if (Component === Video){
    setUrlIsExist(await appointmentIsExist(url)) 
}
}
,[])

  return (
    <div>
     {urlIsExist===false&&<Redirect to="/404" />
}
      { authenticated===false&&<Redirect to="/" />}
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

export default connect(mapStateToProps,{appointmentIsExist})(CombinedRoute);
