import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setFilter } from '../../actions/patientActions';

class FilterPop extends Component {
  constructor(props) {
    super(props); 

    this.state = {
      name: '',
      category: '',
      fee: '',
      exp: '',
      recommendations: '',
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
      recommendations: '',
    });
    setFilter({});
  };

  render() {
    const { categories } = this.props;
    const {
      category,
      fee,
      exp,
      recommendations,
    } = this.state;
    return (
      <form className="mb-5">
        <div className="form-row">
          <div className="form-group col-6 col-md-3">
            <h6><strong>Filter by Category</strong></h6>
            <select
              className="form-control form-control-lg"
              onChange={this.handleSelect}
              value={category}
              name="category"
            >
              <option> -- select  -- </option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group col-6 col-md-3">
          <h6><strong>Filter by Fee</strong></h6>
            <select
              className="form-control form-control-lg"
              onChange={this.handleSelect}
              value={fee}
              name="fee"
            >
              <option> -- select  -- </option>
              <option value={200}>$200 or less</option>
              <option value={300}>$300 or less</option>
              <option value={400}>$400 or less</option>
              <option value={500}>$500 or less</option>
              <option value={600}>$600 or less</option>
            </select>
          </div>
          <div className="form-group col-6 col-md-3">
          <h6><strong>Filter by Experience</strong></h6>
            <select
              className="form-control form-control-lg"
              onChange={this.handleSelect}
              value={exp}
              name="exp"
            >
              <option> -- select  -- </option>
              <option value={2}> 2 &nbsp; Years or more </option>
              <option value={4}> 4 &nbsp; Years or more</option>
              <option value={6}> 6 &nbsp; Years or more</option>
              <option value={8}> 8 &nbsp; Years or more</option>
              <option value={10}>10 Years or more</option>
              <option value={12}>12 Years or more</option>
            </select>
          </div>
          <div className="form-group col-6 col-md-3">
          <h6><strong>Filter by Recommendations</strong></h6>
            <select
              className="form-control form-control-lg"
              onChange={this.handleSelect}
              value={recommendations}
              name="recommendations"
            >
              <option> -- select  -- </option>
              <option value={1}>1 &nbsp; Recommendations or more</option>
              <option value={2}>2 &nbsp; Recommendations or more</option>
              <option value={3}>3 &nbsp; Recommendations or more</option>
              <option value={5}>5 &nbsp; Recommendations or more</option>
              <option value={10}>10 Recommendations or more</option>
              <option value={15}>15 Recommendations or more</option>
            </select>
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
    'Neurologist'
  ],
};

FilterPop.propTypes = {
  setFilter: PropTypes.func.isRequired,
  categories: PropTypes.array,
};

export default connect(null, { setFilter })(FilterPop);
