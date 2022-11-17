import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DoctorInfo from './DoctorInfo';
import DoctorFeedback from './DoctorFeedback';
import ClinicInfo from './ClinicInfo';
import AppNavbar from './AppNavbar';
import star from '../../assets/images/star.png';
import { getSingleDoctor } from '../../actions/patientActions';
import  EditDoctorDetail  from './EditDoctorDetail'
import { userIsExsist } from '../../actions/authActions';
import { addRecommendation } from '../../actions/doctorActions';
import noPic from "../../assets/images/no-pic.jpeg";
class DoctorDetail extends Component  {
  state={
    doctor:{},
    tab: null,
    isExsist:null,

  }

  constructor(props) {
    super(props);
    this.state = ({doctor:this.props.singleDoctor, tab: 0} ||{doctor:this.props.singleDoctor, tab: 0}) ; // In the ||, set default state.
    this.props.history.replace(this.props.location.pathname, this.state); // Update state of current entry in history stack.
  }
  componentDidMount(){
    const id=String(this.props.match.params.id)
    this.props.getSingleDoctor(id);
  }
  async componentDidUpdate(){
    const id=String(this.props.match.params.id)
    if(!this.state.isExsist)
      this.setState({isExsist: await this.props.userIsExsist(id)})
  }
   renderTab = ({ phone, address }) => {
    switch (this.state.tab) {
      case 0:
        return this.props.singleDoctor&& <DoctorInfo info={{education:this.props.singleDoctor.education||"",servicesOffered:this.props.singleDoctor.servicesOffered||"",specialization:this.props.singleDoctor.specialization||""}}/>;
      case 1:
        return <ClinicInfo phone={phone} address={address} />;
      case 2:
        return <DoctorFeedback />;
      default:
        return 0;
    }
  };
  handleClick = (e) => {
    const id = parseInt(e.target.id.split('-')[1]);
    this.setState({tab:id});
  };

  
render(){
  const {singleDoctor,user,history} = this.props||{};
  const {userType}=user||{}
  const {_id,recommendations}=singleDoctor||{}

  const recommendation=singleDoctor&&recommendations.find(recommendation=>recommendation.patientId===user.id)
   if(this.state.isExsist===false){
    return(<Redirect to={"/404"}/>)

  }else
  return (
    <div className="DoctorDetail">
      <AppNavbar bg="#266a61" title="Details" backBtn={history.goBack} />
      {singleDoctor&&user&&userType==="doctor" && (<EditDoctorDetail doctor={singleDoctor}/>)}
      
      {singleDoctor && (
        <div>
          <div className="detail-card">
            <div className="DoctorDetail-info">
              <h4 className="title text-white font-weight-bold">
                {`Dr. ${singleDoctor.name}`}
              </h4>
              <div className="d-flex justify-content-center align-items-center">
                <img className="avatar" src={singleDoctor.image?singleDoctor.image:noPic} alt="Avatar" />
               
              </div>
              <p className="category">{singleDoctor.category}</p>
              <div className="d-flex exp">
                <p>{`$${singleDoctor.fee}`}</p>
                <p>{`${singleDoctor.exp} yrs of experience`}</p>
                <p>
                  <img src={star} alt="likes" />
                  <span>{singleDoctor.recommendations.length}</span>
                </p>
               {userType!=="doctor"&& <button className="btn-submit"
                onClick={()=>{
                  if(!recommendation)
                    this.props.addRecommendation(_id)
                  }}
                   disabled={recommendation?recommendation.recommended:null}>Recommend</button>}        
              </div>
            </div>
          </div>
          <div className="container d-flex tab-content">
            <button
              type="submit"
              className={`tab flex-grow-1 ${this.state.tab === 0 ? 'tab-focus' : ''}`}
              id="tab-0"
              onClick={e => this.handleClick(e)}
            >
              Doctor Info
            </button>
            <button
              type="submit"
              className={`tab flex-grow-1 ${this.state.tab === 1 ? 'tab-focus' : ''}`}
              id="tab-1"
              onClick={e => this.handleClick(e)}
            >
              Clinic Info
            </button>
            <button
              type="submit"
              className={`tab flex-grow-1 ${this.state.tab === 2 ? 'tab-focus' : ''}`}
              id="tab-2"
              onClick={e => this.handleClick(e)}
            >
              Feedback
            </button>
          </div>
          {this.renderTab(singleDoctor)}
           {  user&&userType==="patient" && <div>
       <Link
            to={{
              pathname: `/doctors/${_id}/book`,
              state: { doctor: singleDoctor },
            }}
            className="book-btn"
          >
            Book Appointment
          </Link>

          </div>
          }  
        </div>
      )}
    </div>
  );
}}

DoctorDetail.propTypes = {
  getSingleDoctor: PropTypes.func.isRequired,
  singleDoctor: PropTypes.object,
};

const mapStateToProps = state => ({
  singleDoctor: state.doctor.singleDoctor,
  user:state.auth.user,
});

export default connect  (mapStateToProps, { userIsExsist,addRecommendation,getSingleDoctor })(DoctorDetail);