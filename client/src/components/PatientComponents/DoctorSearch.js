import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import "../../styles/main.scss"
import Navbar from './../GeneralComponents/AppNavbar'
import { getDoctors, setFilter } from '../../actions/patientActions';
import { Modal,
  ModalHeader,
  ModalBody,
 } from 'reactstrap';
import store from '../../store';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import "sweetalert2/dist/sweetalert2.all.min.js";
import winnerImg from "../../assets/images/win.jpg"
const DoctorSearch = ({ doctors,categories, adModal,setFilter,getDoctors, history }) => {  
  const [search, setSearch] = useState('');


  const getRecommendedDoctor=()=>{
    var maxRecommendations=doctors[0]&&doctors[0].recommendations.length
    doctors.forEach(doc => {if(doc.recommendations.length>=maxRecommendations)
      maxRecommendations=doc.recommendations.length
      
    });
    return doctors.find(doc=>maxRecommendations===doc.recommendations.length)
  }


  useEffect(()=>{
    if(!doctors[0]){
      getDoctors({category:"All"})
    }
  },[])



  const handleFilter = (id = null) => {
    const filterObj = {};
    if (search !== '') 
      filterObj.name = search;
    
    if (id) 
      filterObj.category = id;
    

    setFilter(filterObj);
    history.push({pathname:'/doctors',state:{filterObj}});          
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFilter();
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleClick = ({ target: { id } }) => {
    handleFilter(id);
  };

  const displayRecommendedDoc = () => {   
    const doc = getRecommendedDoctor()
    doctors[0]&&doc&&      
      Swal.fire({
        title: `<h3 class="h-text" >Winner! Dr. ${doc.name} is the most recommended doctor!</h3>`,
        width: 450,
        showConfirmButton:true,
        confirmButtonText: 'View Profile',
        preConfirm: () => {history.push({pathname:`/doctors/${doc._id}`,state:{doc}});          
      },
      showCancelButton: true,
      cancelButtonText: "Exit",
      cancelButtonColor: "black",
        bottom: 144,
        background: `#fff url(${winnerImg})`,
        backgroundRepeat:"no-repeat",
        backgroundSize:"contain",
        backgroundPosition:"center",
        imageUrl: `${doc.image}`,
        customClass: 'swal-height',
        imageWidth: 200,
        imageHeight: 280,
        backdrop: `
          rgba(0,0,123,0.4)
          url("https://sweetalert2.github.io/images/nyan-cat.gif")
          left top
          no-repeat
        `
      }) 
      store.dispatch({type:"SET_AD_MODAL"})
  }
  return (
    <div className="DoctorSearch">
      <Navbar  title="Search Doctors" bg="#e0fdf7" />
      <div className="container">
        <div className="search">
          <form onSubmit={e => handleSubmit(e)}>
            <input
              type="search"
              name="search"
              id="search"
              value={search}
              onChange={e => handleChange(e)}
              placeholder="Search for Doctors, specialists etc"
            />
          </form>
        </div>
        <div>
          <br/>
          <br/>
          <h1>Search Doctors</h1>   
          <br/>
                  
          <h5>
            <strong>
            Search by typing the doctors name or by
            clicking one of the categories listed below
            </strong>
        
          </h5>
          <br/>
          <br/>
          <div className="container">
            <div className="categories row">
              {categories.map(category => (
                <div key={category} className="col-6 col-md-4 mb-4">
                  <button
                    type="submit"
                    id={category}
                    onClick={e => handleClick(e)}
                    className="category-btn"
                  >
                    {category}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
{doctors[0]&&
      <Modal
                isOpen={false}
                toggle={()=>store.dispatch({type:"SET_AD_MODAL"})}>
                    <ModalHeader 
                    toggle={()=>{
                    store.dispatch({type:"SET_AD_MODAL"})
                    // setModal(!modal)
                    }
                    }
                    >
                    </ModalHeader>
                        <ModalBody>
                        {(adModal === true)?
                       displayRecommendedDoc()
                       
                         :null}
                        </ModalBody>
      </Modal>
}
    </div>
  );
};

DoctorSearch.defaultProps = {
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

DoctorSearch.propTypes = {
  setFilter: PropTypes.func.isRequired,
  categories: PropTypes.array,
};

const mapStateToProps = state => ({
  adModal: state.auth.adModal,
  doctors: state.doctor.doctors,
});

export default connect(mapStateToProps, { setFilter,getDoctors })(DoctorSearch);
