import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setFilter } from '../actions/patientActions';

class FilterPop extends Component {
  constructor(props) {
    super(props); //   TODO============================================================

    this.state = {
      name: '',
      category: '',
      fee: '',
      exp: '',
      likes: '',
    };
  }


  handleSelect = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    const { setFilter } = this.props;
    e.preventDefault();
    const filterObj = {};
    Object.entries(this.state).forEach(([key, value]) => {
      if (value !== '' && !value.includes('--')) {
        if (parseInt(value)) {
          filterObj[key] = parseInt(value);
        } else {
          filterObj[key] = value;
        }
      }
    });
    setFilter({ ...filterObj });
  };

  handleReset = e => {
    const { setFilter } = this.props;
    e.preventDefault();
    this.setState({
      name: '',
      category: '',
      fee: '',
      exp: '',
      likes: '',
    });
    setFilter({});
  };

  render() {
    const { categories } = this.props;
    const {
      name,
      category,
      fee,
      exp,
      likes,
    } = this.state;
    return (
      <form className="mb-5">
        <div className="form-row">
          <div className="form-group col-6 col-md-3">
            <label>Filter by Category</label>
            <select
              className="form-control form-control-lg"
              onChange={this.handleSelect}
              value={category}
              name="category"
            >
              <option> -- select an option -- </option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group col-6 col-md-3">
            <label>Filter by Fee</label>
            <select
              className="form-control form-control-lg"
              onChange={this.handleSelect}
              value={fee}
              name="fee"
            >
              <option> -- select an option -- </option>
              <option value={200}>$200 or less</option>
              <option value={300}>$300 or less</option>
              <option value={400}>$400 or less</option>
              <option value={500}>$500 or less</option>
              <option value={600}>$600 or less</option>
            </select>
          </div>
          <div className="form-group col-6 col-md-3">
            <label>Filter by Experience</label>
            <select
              className="form-control form-control-lg"
              onChange={this.handleSelect}
              value={exp}
              name="exp"
            >
              <option> -- select an option -- </option>
              <option value={2}>2 years or more</option>
              <option value={4}>4 years or more</option>
              <option value={6}>6 years or more</option>
              <option value={8}>8 years or more</option>
              <option value={10}>10 years or more</option>
              <option value={12}>12 years or more</option>
            </select>
          </div>
          <div className="form-group col-6 col-md-3">
            <label>Filter by Likes</label>
            <select
              className="form-control form-control-lg"
              onChange={this.handleSelect}
              value={likes}
              name="likes"
            >
              <option> -- select an option -- </option>
              <option value={100}>100 likes or more</option>
              <option value={200}>200 likes or more</option>
              <option value={300}>300 likes or more</option>
              <option value={400}>400 likes or more</option>
              <option value={500}>500 likes or more</option>
              <option value={600}>600 likes or more</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="form-group col-12">
            <label>Search by name</label>
            <input
              type="text"
              name="name"
              value={name}
              className="form-control form-control-lg"
              placeholder="Ex: Joesph Wisoky"
              onChange={this.handleSelect}
            />
          </div>
        </div>
        <div className="mt-2">
          <button
            onClick={this.handleSubmit}
            className="btn btn-lg btn-primary mr-3"
            type="submit"
          >
            Apply Filter
          </button>
          <button
            onClick={this.handleReset}
            className="btn btn-lg btn-danger"
            type="button"
          >
            Reset All
          </button>
        </div>
      </form>
    );
  }
}

FilterPop.defaultProps = {
  categories: [
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
  ],
};

FilterPop.propTypes = {
  setFilter: PropTypes.func.isRequired,
  categories: PropTypes.array,
};

export default connect(null, { setFilter })(FilterPop);
