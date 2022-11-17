import React from "react";
import { useSelector } from 'react-redux'
import { postVerify } from '../../actions/authActions';
import {withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import HomePage from "./HomePage";
const EmailVerify = ({postVerify,match}) => {

  const user = useSelector(state => state.auth.user)

    return (
    <div>{postVerify(match.params.verifyToken)}
    {user && (user.isVerified === true &&
     <HomePage/>)}
    </div>
      
        
    );
};

export default withRouter(connect(null, {postVerify})(EmailVerify));