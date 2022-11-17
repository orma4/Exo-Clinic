const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
// Doctor model
const Doctor = require('../../models/Doctor');

// @route           GET api/doctors
// @description:    get all doctors
//@access           public

router.get('/'  , auth, (req,res) => {
       Doctor.find()
              .sort({ date: -1 })
              .then(doctors => res.json(doctors))
    });
    

// @route           POST api/doctors
// @description:    create a doctor
// @access           private
router.post('/', auth, (req,res) => {
   const newDoctor = new Doctor({
      _id: req.body.id,
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      fee: req.body.fee,
      exp: req.body.exp,
      phone: req.body.phone,
      address: req.body.address
   });

   newDoctor.save().then(doctor => res.json(doctor));
});
// @route           GET api/doctors
// @description:    get single doctor
//@access           public
router.get('/:id', auth,(req,res) => {
    Doctor.findById(req.params.id)
        .then(doctor => res.json(doctor));
 });


 // @route           POST api/addFeedBack
// @description:    add   doctor feedback
//@access           public
router.post('/addFeedBack/:id', auth,async(req,res) => {
    var feedbacks=[];
   var doctor=await Doctor.findById(req.params.id);



   feedbacks=  doctor.feedbacks
            
   feedbacks.push({feedback:req.body.feedback,
            patientId:req.body.patientId,date:req.body.date})
            Doctor.findOneAndUpdate({_id : req.params.id}, {feedbacks:feedbacks   },
                { new: true }).then(res.json(feedbacks))
   
 });




// @route           POST api/doctors/updateDoctorDetails
// @description:    create a doctor
// @access           private
router.post('/updateDoctorDetails', auth, (req,res) => {

    const newDoctor = new Doctor({
       _id: req.body._id,
       name: req.body.name,
       image: req.body.image,
       category: req.body.category,
       description: req.body.description,
       fee: req.body.fee,
       exp: req.body.exp,
       recommendations: req.body.recommendations,
       phone: req.body.phone,
       address: req.body.address,
       education:req.body.education,
       specialization:req.body.specialization,
       servicesOffered:req.body.servicesOffered,
       feedbacks:req.body.feedbacks,
       takenAppointments:req.body.takenAppointments
    });

    Doctor.findOneAndUpdate({_id : req.body._id}, {...newDoctor},
        { new: true }).then(res.json(newDoctor))
 
    
 });


// @route           POST api/doctors
// @description:    add taken  appointment
// @access           private

// takenAppointments:
router.post('/addTakenAppointment', auth, async (req,res) => {
    var takenAppointments=[];
    
   var doctor=await Doctor.findById(req.body.doctor._id);
        
            takenAppointments=  doctor.takenAppointments;
            
            takenAppointments.push({id:req.body._id,date:req.body.date,
            time:req.body.time})
            Doctor.findOneAndUpdate({_id : req.body.doctor._id}, {takenAppointments:takenAppointments   },
                { new: true }).then(doctor=>res.json({...doctor._doc}))
 });


 // updateTakenAppointments:
router.post('/updateTakenAppointment', auth, async (req,res) => {
    var takenAppointments=[];
    
   var doctor=await Doctor.findById(req.body.doctor._id);
        
            takenAppointments=  doctor.takenAppointments;

            const appointment=takenAppointments.find(appointment=>appointment.id&&appointment.id===req.body._id)
            const index=takenAppointments.indexOf(appointment)
            takenAppointments.splice(index,index+1)

            takenAppointments.push({id:req.body._id,date:req.body.date,
            time:req.body.time})
            Doctor.findOneAndUpdate({_id : req.body.doctor._id}, {takenAppointments:takenAppointments   },
                { new: true }).then(doctor=>res.json({...doctor._doc}))
 });


 // deleteTakenAppointments:
 router.put('/deleteTakenAppointment', auth, async (req,res) => {
     var takenAppointments=[];
     
    var doctor=await Doctor.findById(req.body.doctor._id);
         
             takenAppointments=  doctor.takenAppointments;
             const appointment=takenAppointments.find(appointment=>appointment.id&&appointment.id===req.body._id)
             const index=takenAppointments.indexOf(appointment)
             takenAppointments.splice(index,index+1)
             Doctor.findOneAndUpdate({_id : req.body.doctor._id}, {takenAppointments:takenAppointments   },
                 { new: true }).then(doctor=>res.json({...doctor._doc}))
  });













// @route           DELETE api/doctor/:id
// @description:    delete a doctor
// @access           private
router.delete('/:id', auth, (req,res) => {
    Doctor.findById(req.params.id)
        .then(doctor => doctor.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
 });


// @route           POST api/doctors/addRecommendation/id
// @description:    add doctor recommendation 
// @access          private
router.post('/addRecommendation/:id'  , async(req,res) => {
    var recommendations=[];
    var doctor=await Doctor.findById(req.params.id);
    recommendations=  doctor.recommendations  
    recommendations.push({patientId:req.body.patientId,recommended:true})
             
     Doctor.findOneAndUpdate({_id : req.params.id}, {recommendations:recommendations}, {
     new: true
  }).then(doctor=>
    res.status(201).json(doctor))})

module.exports = router;