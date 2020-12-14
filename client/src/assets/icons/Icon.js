import React from 'react';
import Google from 'react-icons/lib/fa/google';
import Yahoo from 'react-icons/lib/fa/yahoo';
import Hotmail from 'react-icons/lib/ti/vendor-microsoft';

export const getIcon = ({ onClick, name='', size=16 }) => {
    switch (name) {
        case 'gmail':
            return <span><Google onClick={ onClick } size={ size } style={{ color: 'green' }} /></span>;
        case 'yahoo':
            return <span><Yahoo onClick={ onClick } size={ size } style={{ color: 'purple' }} /></span>;
        case 'hotmail':
            return <span><Hotmail onClick={ onClick } size={ size } style={{ color: 'blue' }} /></span>;
        default:
            return <span />;
    }
};

export const getEmailIcon = ({ email }) => {
    const provider = email.match(/@(.*)\./).pop();
    return getIcon({ name: provider });
}
