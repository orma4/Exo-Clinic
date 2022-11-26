import React, { Component } from "react";
import io from "socket.io-client";
import { IconButton, Badge, Input, Button } from "@material-ui/core";
import VideocamIcon from "@material-ui/icons/Videocam";
import VideocamOffIcon from "@material-ui/icons/VideocamOff";
import MicIcon from "@material-ui/icons/Mic";
import MicOffIcon from "@material-ui/icons/MicOff";
import ScreenShareIcon from "@material-ui/icons/ScreenShare";
import StopScreenShareIcon from "@material-ui/icons/StopScreenShare";
import CallEndIcon from "@material-ui/icons/CallEnd";
import ChatIcon from "@material-ui/icons/Chat";
import { message } from "antd";
import "antd/dist/antd.css";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.css";
import { connect } from "react-redux";
import {
  getDoctorAppointments,
  makeReport,
} from "../../actions/appointmentActions";
import DocumentsTab from "../PatientComponents/DocumentsTab";
import { getUsers } from "../../actions/authActions";
import ReportsHistorty from "../PatientComponents/ReportsHistorty";

const port = process.env.PORT || 3000;

const server_url =
  process.env.NODE_ENV === "production"
    ? "https://exoclinic.cyclic.app/"
    : `http://localhost:${port}`;

var connections = {};
const peerConnectionConfig = {
  iceServers: [
    // { 'urls': 'stun:stun.services.mozilla.com' },
    { urls: "stun:stun.l.google.com:19302" },
  ],
};
var socket = null;
var socketId = null;

class Video extends Component {
  constructor(props) {
    super(props);

    this.localVideoref = React.createRef();

    this.videoAvailable = false;
    this.audioAvailable = false;
    this.userType = props.user.userType;

    this.state = {
      video: false,
      audio: false,
      screen: false,
      showModal: false,
      showModalPres: false,
      screenAvailable: false,
      messages: [],
      message: "",
      report: "",

      newmessages: 0,
      askForUsername: true,
      username: props.user.name,
      documentsModal: false,
      reportsModal: false,
    };
    connections = {};

    this.getPermissions();
  }

  getPermissions = async () => {
    try {
      await navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(() => (this.videoAvailable = true))
        .catch(() => (this.videoAvailable = false));

      await navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then(() => (this.audioAvailable = true))
        .catch(() => (this.audioAvailable = false));

      if (navigator.mediaDevices.getDisplayMedia) {
        this.setState({ screenAvailable: true });
      } else {
        this.setState({ screenAvailable: false });
      }

      if (this.videoAvailable || this.audioAvailable) {
        navigator.mediaDevices
          .getUserMedia({
            video: this.videoAvailable,
            audio: this.audioAvailable,
          })
          .then((stream) => {
            window.localStream = stream;
            this.localVideoref.current.srcObject = stream;
          })
          .then(() => {})
          .catch((e) => console.log(e));
      }
    } catch (e) {
      console.log(e);
    }
  };

  getMedia = () => {
    this.setState(
      {
        video: this.videoAvailable,
        audio: this.audioAvailable,
      },
      () => {
        this.getUserMedia();
        this.connectToSocketServer();
      }
    );
  };

  getUserMedia = () => {
    if (
      (this.state.video && this.videoAvailable) ||
      (this.state.audio && this.audioAvailable)
    ) {
      navigator.mediaDevices
        .getUserMedia({ video: this.state.video, audio: this.state.audio })
        .then(this.getUserMediaSuccess)
        .then(() => {})
        .catch((e) => console.log(e));
    } else {
      try {
        let tracks = this.localVideoref.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      } catch (e) {}
    }
  };

  getUserMediaSuccess = (stream) => {
    try {
      window.localStream.getTracks().forEach((track) => track.stop());
    } catch (e) {
      console.log(e);
    }

    window.localStream = stream;
    this.localVideoref.current.srcObject = stream;

    for (let id in connections) {
      if (id === socketId) continue;

      connections[id].addStream(window.localStream);

      connections[id].createOffer().then((description) => {
        connections[id]
          .setLocalDescription(description)
          .then(() => {
            socket.emit(
              "signal",
              id,
              JSON.stringify({ sdp: connections[id].localDescription })
            );
          })
          .catch((e) => console.log(e));
      });
    }

    stream.getTracks().forEach(
      (track) =>
        (track.onended = () => {
          this.setState(
            {
              video: false,
              audio: false,
            },
            () => {
              try {
                let tracks = this.localVideoref.current.srcObject.getTracks();
                tracks.forEach((track) => track.stop());
              } catch (e) {
                console.log(e);
              }

              let blackSilence = (...args) =>
                new MediaStream([this.black(...args), this.silence()]);
              window.localStream = blackSilence();
              this.localVideoref.current.srcObject = window.localStream;

              for (let id in connections) {
                connections[id].addStream(window.localStream);

                connections[id].createOffer().then((description) => {
                  connections[id]
                    .setLocalDescription(description)
                    .then(() => {
                      socket.emit(
                        "signal",
                        id,
                        JSON.stringify({
                          sdp: connections[id].localDescription,
                        })
                      );
                    })
                    .catch((e) => console.log(e));
                });
              }
            }
          );
        })
    );
  };

  getDislayMedia = () => {
    if (this.state.screen) {
      if (navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices
          .getDisplayMedia({ video: true, audio: true })
          .then(this.getDislayMediaSuccess)
          .then((stream) => {})
          .catch((e) => console.log(e));
      }
    }
  };

  getDislayMediaSuccess = (stream) => {
    try {
      window.localStream.getTracks().forEach((track) => track.stop());
    } catch (e) {
      console.log(e);
    }

    window.localStream = stream;
    this.localVideoref.current.srcObject = stream;

    for (let id in connections) {
      if (id === socketId) continue;

      connections[id].addStream(window.localStream);

      connections[id].createOffer().then((description) => {
        connections[id]
          .setLocalDescription(description)
          .then(() => {
            socket.emit(
              "signal",
              id,
              JSON.stringify({ sdp: connections[id].localDescription })
            );
          })
          .catch((e) => console.log(e));
      });
    }

    stream.getTracks().forEach(
      (track) =>
        (track.onended = () => {
          this.setState(
            {
              screen: false,
            },
            () => {
              try {
                let tracks = this.localVideoref.current.srcObject.getTracks();
                tracks.forEach((track) => track.stop());
              } catch (e) {
                console.log(e);
              }

              let blackSilence = (...args) =>
                new MediaStream([this.black(...args), this.silence()]);
              window.localStream = blackSilence();
              this.localVideoref.current.srcObject = window.localStream;

              this.getUserMedia();
            }
          );
        })
    );
  };

  gotMessageFromServer = (fromId, message) => {
    var signal = JSON.parse(message);

    if (fromId !== socketId) {
      if (signal.sdp) {
        connections[fromId]
          .setRemoteDescription(new RTCSessionDescription(signal.sdp))
          .then(() => {
            if (signal.sdp.type === "offer") {
              connections[fromId]
                .createAnswer()
                .then((description) => {
                  connections[fromId]
                    .setLocalDescription(description)
                    .then(() => {
                      socket.emit(
                        "signal",
                        fromId,
                        JSON.stringify({
                          sdp: connections[fromId].localDescription,
                        })
                      );
                    })
                    .catch((e) => console.log(e));
                })
                .catch((e) => console.log(e));
            }
          })
          .catch((e) => console.log(e));
      }

      if (signal.ice) {
        connections[fromId]
          .addIceCandidate(new RTCIceCandidate(signal.ice))
          .catch((e) => console.log(e));
      }
    }
  };

  connectToSocketServer = () => {
    socket = io.connect(server_url, { secure: true });

    socket.on("signal", this.gotMessageFromServer);

    socket.on("connect", () => {
      socket.emit("join-call", window.location.href);
      socketId = socket.id;

      socket.on("chat-message", this.addMessage);

      socket.on("user-left", (id) => {
        let video = document.querySelector(`[data-socket="${id}"]`);
        if (video !== null) {
          video.parentNode.removeChild(video);
        }
      });

      socket.on("user-joined", (id, clients) => {
        clients.forEach((socketListId) => {
          connections[socketListId] = new RTCPeerConnection(
            peerConnectionConfig
          );
          // Wait for their ice candidate
          connections[socketListId].onicecandidate = function (event) {
            if (event.candidate != null) {
              socket.emit(
                "signal",
                socketListId,
                JSON.stringify({ ice: event.candidate })
              );
            }
          };

          // Wait for their video stream
          connections[socketListId].onaddstream = (event) => {
            var searchVidep = document.querySelector(
              `[data-socket="${socketListId}"]`
            );
            if (searchVidep !== null) {
              searchVidep.srcObject = event.stream;
            } else {
              let main = document.getElementById("main");
              let video = document.createElement("video");
              video.setAttribute("data-socket", socketListId);
              video.srcObject = event.stream;
              video.autoplay = true;
              video.playsinline = true;
              let css = {
                borderStyle: "solid",
                borderColor: "#bdbdbd",
                width: "100%",
                height: "100%",
                marginLeft: "5px",
              };
              for (let i in css) video.style[i] = css[i];

              main.appendChild(video);
            }
          };

          // Add the local video stream
          if (window.localStream !== undefined && window.localStream !== null) {
            connections[socketListId].addStream(window.localStream);
          } else {
            let blackSilence = (...args) =>
              new MediaStream([this.black(...args), this.silence()]);
            window.localStream = blackSilence();
            connections[socketListId].addStream(window.localStream);
          }
        });

        if (id === socketId) {
          for (let id2 in connections) {
            if (id2 === socketId) continue;

            try {
              connections[id2].addStream(window.localStream);
            } catch (e) {}

            connections[id2].createOffer().then((description) => {
              connections[id2]
                .setLocalDescription(description)
                .then(() => {
                  socket.emit(
                    "signal",
                    id2,
                    JSON.stringify({ sdp: connections[id2].localDescription })
                  );
                })
                .catch((e) => console.log(e));
            });
          }
        }
      });
    });
  };

  silence = () => {
    let ctx = new AudioContext();
    let oscillator = ctx.createOscillator();
    let dst = oscillator.connect(ctx.createMediaStreamDestination());
    oscillator.start();
    ctx.resume();
    return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
  };
  black = ({ width = 640, height = 480 } = {}) => {
    let canvas = Object.assign(document.createElement("canvas"), {
      width,
      height,
    });
    canvas.getContext("2d").fillRect(0, 0, width, height);
    let stream = canvas.captureStream();
    return Object.assign(stream.getVideoTracks()[0], { enabled: false });
  };

  handleVideo = () =>
    this.setState({ video: !this.state.video }, () => this.getUserMedia());
  handleAudio = () =>
    this.setState({ audio: !this.state.audio }, () => this.getUserMedia());
  handleScreen = () =>
    this.setState({ screen: !this.state.screen }, () => this.getDislayMedia());
  handleEndCall = () => {
    try {
      let tracks = this.localVideoref.current.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      if (this.props.user.userType === "doctor") {
        this.setState({ showModalPres: true });
      }
      if (this.userType === "patient") window.location.href = "/";
    } catch (e) {}
  };

  openChat = () => this.setState({ showModal: true, newmessages: 0 });
  closeChat = () => this.setState({ showModal: false, showModalPres: false });
  closeReports = () =>
    this.setState({ reportsModal: false, documentsModal: false });
  handleMessage = (e) => this.setState({ message: e.target.value });
  handleReport = (e) => this.setState({ report: e.target.value });
  addMessage = (data, sender, socketIdSender) => {
    this.setState((prevState) => ({
      messages: [...prevState.messages, { sender: sender, data: data }],
    }));
    if (socketIdSender !== socketId) {
      this.setState({ newmessages: this.state.newmessages + 1 });
    }
  };

  handleUsername = (e) => this.setState({ username: e.target.value });

  sendMessage = () => {
    socket.emit("chat-message", this.state.message, this.state.username);
    this.setState({ message: "", sender: this.state.username });
  };

  copyUrl = () => {
    let text = window.location.href;
    if (!navigator.clipboard) {
      let textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        message.success("Link copied to clipboard!");
      } catch (err) {
        message.error("Failed to copy");
      }
      document.body.removeChild(textArea);
      return;
    }
    navigator.clipboard.writeText(text).then(
      function () {
        message.success("Link copied to clipboard!");
      },
      () => {
        message.error("Failed to copy");
      }
    );
  };

  connect = () =>
    this.setState({ askForUsername: false }, () => this.getMedia());

  isChrome = function () {
    let userAgent = (navigator && (navigator.userAgent || "")).toLowerCase();
    let vendor = (navigator && (navigator.vendor || "")).toLowerCase();
    let matchChrome = /google inc/.test(vendor)
      ? userAgent.match(/(?:chrome|crios)\/(\d+)/)
      : null;
    return matchChrome !== null;
  };
  onSubmit = () => {
    if (this.state.report.length === 0) {
      alert("Please enter the report of this appointment");
      return false;
    }
    const appointment = this.props.location.state;
    this.props.makeReport(appointment._id, this.state.report);
    window.location.href = "/";
    return true;
  };
  componentDidUpdate() {
    if (!this.props.users || !this.props.appointments) {
      this.props.getUsers();
      this.props.getDoctorAppointments(this.props.user.id);
    }
  }

  render() {
    const documents = () => {
      if (this.userType === "doctor") {
        const id = String(this.props.match.params.url);
        if (this.props.appointments && this.props.users) {
          var appointment = this.props.appointments.find(
            (appointment) => id === appointment._id
          );
          var patient =
            appointment &&
            this.props.users.find(
              (user) => appointment.patient.id === user._id
            );
          return patient && patient.documents;
        }
      }
    };
    const patientId = () => {
      if (this.userType === "doctor") {
        const id = String(this.props.match.params.url);
        if (this.props.appointments) {
          var appointment = this.props.appointments.find(
            (appointment) => id === appointment._id
          );
          return appointment && appointment.patient.id;
        }
      }
    };
    const documentsModalEl = (
      <>
        {this.state && (
          <Modal
            show={this.state.documentsModal}
            onHide={this.closeReports}
            style={{ zIndex: "999999" }}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <h4>Patient Documents</h4>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{
                overflow: "auto",
                overflowY: "auto",
                height: "400px",
                textAlign: "left",
              }}
            >
              <DocumentsTab documents={documents()} />
            </Modal.Body>
          </Modal>
        )}
      </>
    );
    const reportsModalEl = (
      <>
        {this.state && (
          <Modal
            show={this.state.reportsModal}
            onHide={this.closeReports}
            style={{ zIndex: "999999" }}
          >
            <Modal.Header closeButton>
              <Modal.Title>
                <h4>Patient Reports</h4>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{
                overflow: "auto",
                overflowY: "auto",
                height: "400px",
                textAlign: "left",
              }}
            >
              <ReportsHistorty patientId={patientId()} />
            </Modal.Body>
          </Modal>
        )}
      </>
    );
    return (
      <div>
        {this.state.askForUsername === true ? (
          <div>
            <div
              style={{
                background: "white",
                width: "30%",
                height: "auto",
                padding: "20px",
                minWidth: "400px",
                textAlign: "center",
                margin: "auto",
                marginTop: "50px",
                justifyContent: "center",
              }}
            >
              <p
                style={{ margin: 0, fontWeight: "bold", paddingRight: "50px" }}
              >
                Set your username
              </p>
              <Input
                placeholder="Username"
                value={this.state.username}
                onChange={(e) => this.handleUsername(e)}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={this.connect}
                style={{ margin: "20px" }}
              >
                Connect
              </Button>
            </div>

            <div
              style={{
                justifyContent: "center",
                textAlign: "center",
                paddingTop: "40px",
              }}
            >
              <video
                id="my-video"
                ref={this.localVideoref}
                autoPlay
                muted
                style={{
                  borderStyle: "solid",
                  borderColor: "#bdbdbd",
                  objectFit: "fill",
                  width: "50%",
                  height: "10%",
                }}
              ></video>
            </div>
          </div>
        ) : (
          <div>
            <Modal
              show={this.state.showModalPres}
              onHide={this.closeChat}
              style={{ zIndex: "999999" }}
            >
              <Modal.Header closeButton>
                <Modal.Title>Enter Report</Modal.Title>
              </Modal.Header>
              <Modal.Body
                style={{
                  overflow: "auto",
                  overflowY: "auto",
                  height: "400px",
                  textAlign: "left",
                }}
              >
                <textarea
                  className="form-control"
                  onChange={(e) => this.handleReport(e)}
                  value={this.state.report}
                  id="message-text"
                ></textarea>
              </Modal.Body>
              <Modal.Footer className="div-send-msg">
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.onSubmit}
                >
                  Update
                </Button>
              </Modal.Footer>
            </Modal>
            <Modal
              show={this.state.showModal}
              onHide={this.closeChat}
              style={{ zIndex: "999999" }}
            >
              <Modal.Header closeButton>
                <Modal.Title>Chat Room</Modal.Title>
              </Modal.Header>
              <Modal.Body
                style={{
                  overflow: "auto",
                  overflowY: "auto",
                  height: "400px",
                  textAlign: "left",
                }}
              >
                {this.state.messages.length > 0 ? (
                  this.state.messages.map((item, index) => (
                    <div key={index} style={{ textAlign: "left" }}>
                      <p style={{ wordBreak: "break-all" }}>
                        <b>{item.sender}</b>: {item.data}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No message yet</p>
                )}
              </Modal.Body>
              <Modal.Footer className="div-send-msg">
                <Input
                  placeholder="Message"
                  value={this.state.message}
                  onChange={(e) => this.handleMessage(e)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.sendMessage}
                >
                  Send
                </Button>
              </Modal.Footer>
            </Modal>

            <div style={{ paddingTop: "20px" }}>
              <Input value={window.location.href} disable="true"></Input>
              <Button
                style={{
                  backgroundColor: "#3f51b5",
                  color: "whitesmoke",
                  marginLeft: "20px",
                  marginTop: "10px",
                  width: "120px",
                  fontSize: "10px",
                }}
                onClick={this.copyUrl}
              >
                Copy invite link
              </Button>
              {this.userType === "doctor" && (
                <>
                  <Button
                    style={{
                      backgroundColor: "#3f51b5",
                      color: "whitesmoke",
                      marginLeft: "20px",
                      marginTop: "10px",
                      width: "120px",
                      fontSize: "10px",
                    }}
                    onClick={() =>
                      this.setState({
                        documentsModal: !this.state.documentsModal,
                      })
                    }
                  >
                    view patient documents
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "#3f51b5",
                      color: "whitesmoke",
                      marginLeft: "20px",
                      marginTop: "10px",
                      width: "120px",
                      fontSize: "10px",
                    }}
                    onClick={() =>
                      this.setState({ reportsModal: !this.state.reportsModal })
                    }
                  >
                    view patient reports
                  </Button>
                </>
              )}
            </div>

            <div className="row">
              <div className="col-lg-6">
                <div className="embed-responsive embed-responsive-4by3">
                  <video
                    id="my-video"
                    ref={this.localVideoref}
                    autoPlay
                    muted
                    style={{
                      borderStyle: "solid",
                      borderColor: "#bdbdbd",
                      width: "100%",
                      height: "100%",
                      marginLeft: "5px",
                      marginRight: "5px",
                    }}
                  ></video>
                </div>
              </div>
              <div className="col-lg-6">
                <div
                  id="main"
                  className="embed-responsive embed-responsive-4by3"
                />
              </div>
            </div>

            <div
              className="btn-down"
              style={{
                backgroundColor: "whitesmoke",
                color: "whitesmoke",
                textAlign: "center",
              }}
            >
              <IconButton
                style={{ color: "#424242" }}
                onClick={this.handleVideo}
              >
                {this.state.video === true ? (
                  <VideocamIcon />
                ) : (
                  <VideocamOffIcon />
                )}
              </IconButton>

              <IconButton
                style={{ color: "#f44336" }}
                onClick={this.handleEndCall}
              >
                <CallEndIcon />
              </IconButton>

              <IconButton
                style={{ color: "#424242" }}
                onClick={this.handleAudio}
              >
                {this.state.audio === true ? <MicIcon /> : <MicOffIcon />}
              </IconButton>

              {this.state.screenAvailable === true ? (
                <IconButton
                  style={{ color: "#424242" }}
                  onClick={this.handleScreen}
                >
                  {this.state.screen === true ? (
                    <ScreenShareIcon />
                  ) : (
                    <StopScreenShareIcon />
                  )}
                </IconButton>
              ) : null}

              <Badge
                badgeContent={this.state.newmessages}
                max={999}
                color="secondary"
                onClick={this.openChat}
              >
                <IconButton
                  style={{ color: "#424242" }}
                  onClick={this.openChat}
                >
                  <ChatIcon />
                </IconButton>
              </Badge>
            </div>
            {reportsModalEl}
            {documentsModalEl}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  users: state.auth.users,
  appointments: state.appointment.appointments,
});

export default connect(mapStateToProps, {
  makeReport,
  getUsers,
  getDoctorAppointments,
})(Video);
