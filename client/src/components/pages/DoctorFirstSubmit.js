import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { submitInfo } from './../../actions/doctorActions';
import { updateDocState } from './../../actions/authActions';



class DoctorFirstSubmit extends Component {

  state = {
    image: '',
    category:'',
    description: '',
    fee: '',
    exp: '',
    phone: '',
    address: '',
  };

   categories = [
    'All',
    'General Doctor',
    'Mental Health',
    'Skin',
    'Child Care',
    'Women Health',
    'Dentist',
    'ENT',
    'Homeopathy',
    'Ayurveda',
    'Heart',
  ];


   handleChange = e => this.setState({ ...this.state , [e.target.name]: e.target.value });

 
   handleSubmit = (e) => {
    const {user} = this.props;
    const id = user.id;
    const name = user.name;

    const doctorData = { id,name, ...this.state }
  
    e.preventDefault();

    this.props.submitInfo(doctorData);
    
    this.props.updateDocState(user);
    
  };

  render() {
    
    return (
    <div className="DoctorFirstSubmit">
      <form className="container" onSubmit={e => this.handleSubmit(e)}>
        <div className="form-field">
          <label htmlFor="image">Doctor image</label>
          <input
            type="text"
            name="image"
            id="image"
            value={this.state.image}
            onChange={e => this.handleChange(e)}
            placeholder="Enter doctor's image url"
            required
          />
        </div>


        <div className="form-field">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" className="form-control text-uppercase" 
            onChange={e => this.handleChange(e)} value={this.state.category} required>
                  {this.categories.map(category => {
                  return(<option>{category}</option>);
                  })}
            </select>
        </div>

        {/* <div className="form-field">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            name="category"
            id="category"
            value={this.state.category}
            onChange={e => this.handleChange(e)}
            placeholder="Enter doctor's category"
            required
          />
        </div> */}

        <div className="form-field">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            value={this.state.description}
            onChange={e => this.handleChange(e)}
            placeholder="Enter doctor's description"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="fee">Doctor Fee</label>
          <input
            type="number"
            name="fee"
            id="fee"
            value={this.state.fee}
            onChange={e => this.handleChange(e)}
            placeholder="Enter doctor's fee"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="exp">Doctor Experience</label>
          <input
            type="number"
            name="exp"
            id="exp"
            value={this.state.exp}
            onChange={e => this.handleChange(e)}
            placeholder="Enter doctor's experience"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="phone">Doctor Phone no.</label>
          <input
            type="text"
            name="phone"
            id="phone"
            value={this.state.phone}
            onChange={e => this.handleChange(e)}
            placeholder="Enter doctor's phone"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="address">Doctor Address</label>
          <input
            type="text"
            name="address"
            id="address"
            value={this.state.address}
            onChange={e => this.handleChange(e)}
            placeholder="Enter doctor's Address"
            required
          />
        </div>

        <input type="submit" value="Submit Info" className="book-btn" />
      </form>
    </div>
  );
}
}

DoctorFirstSubmit.propTypes = {
  submitInfo: PropTypes.func.isRequired,
};


const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { submitInfo, updateDocState })(DoctorFirstSubmit);
