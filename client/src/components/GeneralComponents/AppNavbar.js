import React, { Component, Fragment } from "react";
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Container,
  NavbarToggler,
} from "reactstrap";
import RegisterModal from "./Auth/RegisterModal";
import LoginModal from "./Auth/LoginModal";
import Logout from "./Auth/Logout";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import noPic from "../../assets/images/no-pic.jpeg";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  getUsers,
  readNotification,
  deleteNotifications,
} from "../../actions/authActions";
import leftArrow from "../../assets/images/left-arrow.png";
import { TheHeaderDropdown } from "../AdminComponents/containers";
import moment from "moment";
import bookingsIcon from "../../assets/images/booking-icon.png";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/dist/sweetalert2.all.min.js";

class AppNavbar extends Component {
  state = {
    isOpen: false,
    notificationsNumber: 0,
    notifications: this.props.notifications && this.props.notifications,
    isRead: this.props.auth.user && this.props.auth.user.notificationIsRead,
  };

  static propTypes = {
    auth: PropTypes.object.isRequired,
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  componentDidMount() {
    if (!this.props.users && this.props.auth.user) {
      this.props.getUsers();
    }
    if (this.state.isRead === false) {
      this.setState({
        ...this.state,
        notificationsNumber:
          this.props.auth.user && this.props.auth.user.notificationsNumber,
      });
    }
  }

  render() {
    const { isAuthenticated, user, users } = this.props.auth;
    const getUser = (id) => {
      return users.find((user) => user._id === id);
    };
    const notificationCheck = (notification) => {
      switch (notification.notification) {
        case "add":
          return "You have new booked appointment";
        case "delete":
          return "The appointment was deleted";
        case "update":
          return "Appointment time/date updated";
        default:
          break;
      }
    };
    const dropDownMenu = (
      <CDropdown inNav className="c-header-nav-item mx-2" direction="down">
        <CDropdownToggle
          onClick={() => {
            if (this.state.isRead === false) {
              this.props.readNotification(user.id);
              this.setState({
                ...this.state,
                isRead: true,
                notificationsNumber: 0,
              });
            }
          }}
          className="c-header-nav-link"
          caret={false}
        >
          <CIcon
            size={"3xl"}
            name="cil-bell"
            style={{ color: "white", top: "6px", position: "relative" }}
          />
          <CBadge style={{ fontSize: "15px" }} shape="pill" color="info">
            {user && user.notifications && this.state.notificationsNumber}
          </CBadge>
        </CDropdownToggle>
        <CDropdownMenu className="pt-0" placement="bottom-end">
          <CDropdownItem
            tag="div"
            href="#"
            onClick={() => {
              if (this.state.notifications.length > 0) {
                Swal.fire({
                  title: "Are you sure you want to delete notifications?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    this.props.deleteNotifications(user.id);
                    this.setState({ ...this.state, notifications: [] });

                    Swal.fire(
                      "Deleted!",
                      "Your notifications are deleted",
                      "success"
                    );
                  }
                });
              }
            }}
          >
            {user &&
            user.notifications &&
            this.state.notifications.length > 0 ? (
              <DeleteIcon />
            ) : (
              <strong>No notifications </strong>
            )}
          </CDropdownItem>
          {users && this.state.notifications && user
            ? this.state.notifications.map((notification, index) => {
                if (notification.userId) {
                  const userNotify = getUser(notification.userId);
                  return (
                    userNotify && (
                      <CDropdownItem
                        key={index}
                        href={
                          user.userType === "patient"
                            ? `/doctors/${userNotify._id}`
                            : `/userProfile/${userNotify._id}`
                        }
                      >
                        {userNotify && (
                          <div className="message">
                            <div className="pt-3 mr-3 float-left">
                              <div className="c-avatar">
                                <CImg
                                  src={
                                    userNotify.image ? userNotify.image : noPic
                                  }
                                  className="c-avatar-img"
                                  alt=""
                                />
                                <span className="c-avatar-status bg-success"></span>
                              </div>
                            </div>
                            <div>
                              <small className="text-muted float-right mt-1">
                                <strong>
                                  {notification.date
                                    ? String(
                                        moment(
                                          new Date(notification.date)
                                        ).format("YYYY-MM-DD")
                                      )
                                    : null}
                                </strong>
                              </small>
                              <br />
                              <small className="text-muted float-right mt-1">
                                <strong>
                                  {notification.date
                                    ? String(
                                        moment(
                                          new Date(notification.date)
                                        ).format("HH:MM")
                                      )
                                    : null}
                                </strong>
                              </small>
                            </div>
                            <div className="text-truncate font-weight-bold">
                              <span className="fa fa-exclamation text-danger"></span>{" "}
                              {userNotify.name}
                            </div>
                            <span className="text-muted text-truncate">
                              {notificationCheck(notification)}
                            </span>
                          </div>
                        )}
                      </CDropdownItem>
                    )
                  );
                }
              })
            : null}
        </CDropdownMenu>
      </CDropdown>
    );
    const adminLinks = (
      <Fragment>
        {user && (
          <div>
            <TheHeaderDropdown
              user={user}
              logout={<Logout />}
              profile={
                <Link
                  className="profile-link"
                  to={{
                    pathname: `/userProfile/${user.id}`,
                    state: { user: this.props.auth.user },
                  }}
                >
                  VIEW PROFILE
                </Link>
              }
            />
          </div>
        )}
      </Fragment>
    );
    const patientLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong
              style={{
                color: "white",
                fontSize: "15px",
                top: "10px",
                position: "relative",
              }}
            >
              {user ? `Welcome ${user.name}` : ""}
            </strong>
          </span>
        </NavItem>
        <div>{dropDownMenu}</div>

        {user && (
          <div>
            <TheHeaderDropdown user={user} />
          </div>
        )}

        <div>
          <Link
            className="bookings-link"
            to={{
              pathname: `/bookings`,
              state: { user: this.props.auth.user },
            }}
          >
            <Tooltip title={<h5 style={{ color: "white" }}>Bookings</h5>}>
              <img
                src={bookingsIcon}
                style={{
                  width: "30px",
                  height: "30px",
                  top: "7px",
                  position: "relative",
                }}
              />
            </Tooltip>
          </Link>
        </div>
      </Fragment>
    );

    const doctorLinks = (
      <Fragment>
        <NavItem>
          <span className="navbar-text mr-3">
            <strong
              style={{
                color: "white",
                fontSize: "15px",
                top: "10px",
                position: "relative",
              }}
            >
              {user ? `Welcome Dr. ${user.name}` : ""}
            </strong>
          </span>
        </NavItem>

        <div>{dropDownMenu}</div>

        {user && (
          <div>
            <TheHeaderDropdown user={user} logout={<Logout />} />
          </div>
        )}
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
        <NavItem>
          <RegisterModal />
        </NavItem>
        <NavItem>
          <LoginModal />
        </NavItem>
      </Fragment>
    );

    return (
      <Navbar color="dark" dark sticky="top" expand="sm">
        <Container>
          {this.props.backBtn && (
            <img
              className="left-icon"
              src={leftArrow}
              alt="Left icon"
              width="30px"
              height="30px"
              onClick={this.props.backBtn}
            />
          )}
          <div className="Navbar d-flex justify-content-between"></div>
          <NavbarBrand href="/" className="brand">
            <strong style={{ color: "white", fontSize: "20px" }}>
              Exo Clinic
            </strong>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {isAuthenticated
                ? user.userType === "patient"
                  ? patientLinks
                  : user.userType === "doctor"
                  ? doctorLinks
                  : adminLinks
                : guestLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  notifications: state.auth.user && state.auth.user.notifications,
  singleDoctor: state.doctor.singleDoctor,
});

export default connect(mapStateToProps, {
  readNotification,
  getUsers,
  deleteNotifications,
})(AppNavbar);
