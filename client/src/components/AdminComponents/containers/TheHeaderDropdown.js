import React from 'react'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { connect } from 'react-redux';
import { logout } from '../../../actions/authActions';
import noPic from "../../../assets/images/no-pic.jpeg";
import { useHistory } from 'react-router-dom';


const TheHeaderDropdown = ({user,logout}) => {

  const history = useHistory();

  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={user&&user.image?user.image:noPic}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem
          header
          tag="div"
          color="light"
          className="text-center"
        >
          <strong>Account</strong>
        </CDropdownItem>
        {user.userType !== "admin" &&
        <CDropdownItem onClick={()=>{
          if (user.userType === "patient")
            history.push({pathname:`/userProfile/${user.id}`,state: { user: user } });
          if(user.userType === "doctor")
            history.push({pathname:`/doctors/${user.id}`,state: { user: user } });           
        }}>
          <CIcon name="cil-settings" className="mfe-2" />
          Profile
        </CDropdownItem>
}

        <CDropdownItem onClick={()=>logout()}>
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default connect(null, { logout })(TheHeaderDropdown);