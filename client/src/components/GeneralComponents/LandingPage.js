import React, {useState} from "react";
import AppNavbar from "./AppNavbar";
const LandingPage = () => {
  const [contact,setContact]=useState({firstName:"",lastName:"",email:"",phone:"",message:""})
  const handleChange = e => setContact({ ...contact , [e.target.name]: e.target.value })

  return (
    <>
    <AppNavbar />
<div>

  <link href="styles/styles.css" rel="stylesheet" type="text/css"/>  
  <link href="styles/custom-responsive-styles.css" rel="stylesheet" type="text/css"/>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" />

    <script type="text/javascript" src="scripts/jquery-3.2.1.min.js"></script>
   <script type="text/javascript" src="scripts/all-plugins.js"></script>
   <script type="text/javascript" src="scripts/plugins-activate.js"></script> 
   <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"/>
      
     
        





   <section id="Banner" className="content-section">


   <a className="mmeennuu" href="">
          
          <input type='checkbox' id='mmeennuu'></input>
           <label class='menu' for='mmeennuu'>
 
           <div class='barry'>
             <span class='bar'></span>
             <span class='bar'></span>
             <span class='bar'></span>
             <span class='bar'></span>
           </div>
             
           <ul>
             {/* <li> <a className="smooth-scroll" href="#top">Home</a> </li> */}
             <li><a className="smooth-scroll" href="#About">About</a></li>
             <li><a className="smooth-scroll" href="#Services">Services</a></li>
             <li><a className="smooth-scroll" href="#Testimonials">Testimonials</a></li>
             <li><a className="smooth-scroll" href="#Contact">Contact</a></li>
           
           </ul>
 
           </label>
           {/* <i className="fa fa-bars"></i> */}
         </a> 





        {/* <nav id="sidebar-wrapper">
          <ul className="sidebar-nav">
            <li className="sidebar-brand">
              <a className="smooth-scroll" href="#Header"></a>
            </li>
            <li className="sidebar-nav-item">
              <a className="smooth-scroll" href="#top">Home</a>
            </li>
            <li className="sidebar-nav-item">
              <a className="smooth-scroll" href="#About">About</a>
            </li>
            <li className="sidebar-nav-item">
              <a className="smooth-scroll" href="#Services">Services</a>
            </li>
            <li className="sidebar-nav-item">
              <a className="smooth-scroll" href="#Testimonials">Testimonials</a>
            </li>
            <li className="sidebar-nav-item">
              <a className="smooth-scroll" href="#Contact">Contact</a>
            </li>
          </ul>
        </nav> */}
       
          <div className="container content-wrap text-center">
            <h1>Welcome to Exo Clinc</h1>
            <br/>
            <br/>
            <br/>
            {/* <h3>
                <em>Please Log in to manage account</em>
              </h3> */}
            <a className="btn btn-primary btn-xl smooth-scroll" href="#About">Find Out More</a>
          </div>
          <div className="overlay"></div>
        </section>
       
        <section id="About" className="content-section">
          <div className="container text-center">
            <div className="row">
              <div className="col-lg-12">
                <div className="block-heading">
                  <h1 className="about-text">Quality Healthcare Made Simple</h1>
                </div>
                <p style={{fontFamily:"georgia",fontSize:"17px"}} className="lead">Exo Clinic is on a mission to make quality healthcare affordable and accessible for everyone. We believe in empowering our users with the most accurate, comprehensive, and curated information and care, enabling them to make better healthcare decisions.</p>
              </div>
            </div>
          </div>
        </section>
       
        <section id="Services" className="content-section text-center">
          <div className="container">
            <div className="block-heading">
              <h3>What We Offer</h3>
            </div>
            <div className="row">
              <div className="col-md-3 col-sm-6">
                <div className="service-box">
                  <div className="service-icon yellow">
                    <div className="front-content">
                      <i className="fa fa-phone" aria-hidden="true"></i>
                      <h3>Online Video Calls</h3>
                    </div>
                  </div>
                  <div className="service-content">
                    <h3>Video Calls</h3>
                    <br/>
                    <p>Enjoy our built in video calls system. Speak freely and privately with your favorite doctor, using your own computer or even mobile!</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="service-box">
                  <div className="service-icon orange">
                    <div className="front-content">
                      <i className="fa fa-user-md "></i>
                      <h3>Choose Doctors</h3>
                    </div>
                  </div>
                  <div className="service-content">
                    <h3>Choose Doctors</h3>
                    <br/> 
                    <p>Search and filter doctors by category, price, recommendations and experience. Don't forget to view the doctors' profiles with more detailed information!</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="service-box ">
                  <div className="service-icon red">
                    <div className="front-content">
                      <i className="fa fa-calendar" aria-hidden="true"></i>
                      <h3>Appointments Booking</h3>
                    </div>
                  </div>
                  <div className="service-content">
                    <h3>Appointments Booking</h3>
                    <br/>
                    <p>Book appointments with doctors according to your choice. You can also update or delete them!</p>
                  </div>
                </div>
              </div>
              <div className="col-md-3 col-sm-6">
                <div className="service-box">
                  <div className="service-icon grey">
                    <div className="front-content">
                      <i className="fa fa-medkit"></i>
                      <h3>Private Medical File</h3>
                    </div>
                  </div>
                  <div className="service-content">
                    <h3>Medical File</h3>
                    <br/>
                    <p>View your private medical files easily. You can see all the medical files uploaded to your profile, including the doctor's name and date!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section id="Testimonials" className="content-section">
          <div className="container">
            <div className="row">
              <div className="col-sm-12">
                <div className="block-heading">
                  <h3>Testimonials</h3>
                </div>
                <div id="customers-testimonials" className="owl-carousel">
                  <div className="item">
                    <div className="shadow-effect">
                      <img  className="img-circle" src="https://thumbs.dreamstime.com/b/female-doctor-working-office-7228862.jpg" alt="" />
                      <p>“We chose Exo Clinic because we found they provided good clinical quality video over low bandwidth, which was important for us as we began to deliver telemedicine services to other countries and rural areas where there is extremely reduced connectivity.”</p>
                    </div>
                    <div className="testimonial-name">Sarah Fergson</div>
                  </div>
                  <div className="item">
                    <div className="shadow-effect">
                      <img className="img-circle" src="https://thumbs.dreamstime.com/b/pretty-doctor-office-18317465.jpg" alt="" />
                      <p>“Exo Clinic maintains a small-town feel. It has great program management, sales, and engineering – and that makes a difference.”</p>
                    </div>
                    <div className="testimonial-name">Angela White</div>
                  </div>
                  <div className="item">
                    <div className="shadow-effect">
                      <img className="img-circle" src="https://thumbs.dreamstime.com/b/mature-doctor-smiling-lab-coat-20855424.jpg" alt="" />
                      <p>“The simple yet handful of user experience caught my attention. Absolutely recommended!”</p>
                    </div>
                    <div className="testimonial-name">John Sawyer</div>
                  </div>
                  <div className="item">
                    <div className="shadow-effect">
                      <img className="img-circle" src="https://thumbs.dreamstime.com/z/doctor-working-office-7628621.jpg" alt="" />
                      <p>“Attended by a warm patient care consultant and consulted by Dr. Or over the video call in a serene manner. It was indeed an excellent service. Keep up the good work!”</p>
                    </div>
                    <div className="testimonial-name">Ran Toran</div>
                  </div>
                  <div className="item">
                    <div className="shadow-effect">
                      <img className="img-circle" src="https://thumbs.dreamstime.com/b/portrait-doctor-36095579.jpg" alt="" />
                      <p>“Very fast response and very helpful indeed. Excellent services from Exo Clinic. Very convenient use with extremely nice people that I can't get anywhere else.”</p>
                    </div>
                    <div className="testimonial-name">Daniel Marks</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
       
        <section id="Contact" className="content-section">
          <div className="container">
            <div className="block-heading">
              <h3>Contact Us</h3>
            </div>
            <div className="row">
              <div className="col-sm-12 col-md-6 col-lg-6">
                <div className="contact-wrapper">
                  <div className="address-block border-bottom">
                    <h3 className="add-title">Headquaters</h3>
                    <br/>
                    <div className="c-detail">
                      <span className="c-icon"><i className="fa fa-map-marker" aria-hidden="true"></i></span><span className="c-info"> Tel Aviv, Israel</span>
                    </div>
                    <div className="c-detail">
                      <span className="c-icon"><i className="fa fa-phone" aria-hidden="true"></i></span><span className="c-info">202-555-0141</span>
                    </div>
                    <div className="c-detail">
                      <span className="c-icon"><i className="fa fa-envelope" aria-hidden="true"></i></span><span className="c-info">exoclinic@mail.com</span>
                    </div>
                  </div>
                  <div className="address-block">
                    <h3 className="add-title">Branch</h3>
                    <br/>
                    <div className="c-detail">
                      <span className="c-icon"><i className="fa fa-map-marker" aria-hidden="true"></i></span><span className="c-info"> Ashdod, Israel</span>
                    </div>
                    <div className="c-detail">
                      <span className="c-icon"><i className="fa fa-phone" aria-hidden="true"></i></span><span className="c-info">202-555-0196</span>
                    </div>
                    <div className="c-detail">
                      <span className="c-icon"><i className="fa fa-envelope" aria-hidden="true"></i></span><span className="c-info">exoclinic@mail.com</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-12 col-md-6 col-lg-6">
                <div className="form-wrap">
                <form action="#" >
                    <div className="fname floating-label">
                      <input type="text" value={contact.firstName}  onChange={e => handleChange(e)}
className="floating-input" name="firstName" />
                      <label htmlFor="title">First Name</label>
                    </div>
                    <div className="fname floating-label">
                      <input type="text" value={contact.lastName} onChange={e => handleChange(e)} className="floating-input" name="lastName" />
                      <label htmlFor="title">Last Name</label>
                    </div>
                    <div className="email floating-label">
                      <input type="email"value={contact.email} onChange={e => handleChange(e)} className="floating-input" name="email" />
                      <label htmlFor="email">Email</label>
                    </div>
                    <div className="contact floating-label">
                      <input type="tel"value={contact.phone}  onChange={e => handleChange(e)} className="floating-input" name="phone" />
                      <label htmlFor="email">Phone</label>
                    </div>
                    <div className="company floating-label">
                      <textarea             value={contact.message} onChange={e => handleChange(e)} type="text" className="floating-input" name="message"></textarea>
                      <label htmlFor="email">Message</label>
                    </div>
                    <div className="submit-btn">
                      <button type="submit" onClick={()=>{
                        if(contact.firstName!=""&&contact.lastName!=""&&contact.email!=""&&contact.phone!=""&&contact.message!="")
                        {
                          setContact({firstName:"",lastName:"",email:"",phone:"",message:""})
                          alert("Thank For Contacting Us")
                        }
                        else {
                          alert("Please enter all fields")
                        }
                        }
                        }
                      
                        >Submit</button>
                      
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        <footer className="footer text-center">
          <div className="container">
            <ul className="list-inline">
              <li className="list-inline-item">
                <a className="social-link rounded-circle text-white mr-3" href="#">
                    <i className="fa fa-facebook" aria-hidden="true"></i>
                  </a>
              </li>
              <li className="list-inline-item">
                <a className="social-link rounded-circle text-white mr-3" href="#">
                    <i className="fa fa-twitter" aria-hidden="true"></i>
                  </a>
              </li>
              <li className="list-inline-item">
                <a className="social-link rounded-circle text-white" href="#">
                    <i className="fa fa-linkedin" aria-hidden="true"></i>
                  </a>
              </li>
            </ul>
            <p className="text-muted small mb-0">Copyright © Exo Clinic 2021</p>
            
          </div>
        </footer>
    
    </div>
    </>

  )
}
export default LandingPage;