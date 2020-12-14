const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Appointment = require('../../models/Appointment');

// @route           GET api/appointments/getPatientAppointments/:id
// @description:    get all appointments for specific patient
//@access           public
router.get('/getPatientAppointments/:id', auth , (req,res) => {
    Appointment.find({'patient.id': req.params.id})
        .sort({ date: -1 })
        .then(appointments => res.json(appointments));
});


// @route           GET api/appointments/getDoctorAppointments/:id
// @description:    get all appointments for specific doctor
// @access          public
router.get('/getDoctorAppointments/:id', auth , (req,res) => {
    Appointment.find({'doctor._id': req.params.id})
        .sort({ date: -1 })
        .then(appointments => res.json(appointments));
});



// @route           GET api/appointments/getDoctorPatients/:id
// @description:    get all patients for specific doctor
// @access          public
router.get('/getDoctorPatients/:id', auth , (req,res) => {
    var patients=[];
    Appointment.find({'doctor._id': req.params.id})
        .sort({ date: -1 })
        .then(appointments => {
            appointments.map(appointment=>{
                patients=[...patients,appointment.patient]
            })
        let patientsIds = patients.map(patient => patient.id)
        let filteredPatients = patients.filter(({id}, index) => !patientsIds.includes(id, index + 1)) 
        console.log(filteredPatients)
        res.json(filteredPatients);
        });
            
});










// @route           POST api/appointments
// @description:    create a appointment
// @access           private
router.post('/createAppointment', auth, (req,res) => {
   const newAppointment = new Appointment({
        doctor: req.body.doctor,
        patient: req.body.patient,
        date: req.body.date,
        reason:req.body.reason,
        time:req.body.time,
        status: req.body.status,
        prescription: req.body.prescription
   });
   newAppointment.save().
   then(appointment => res.json(appointment));
  
});

// @route           DELETE api/appointment/:id
// @description:    delete a appointmet
// @access           private
router.delete('/delete/:id', auth, (req,res) => {
    Appointment.findById(req.params.id)
        .then(appointment  => appointment.remove()
        .then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
 });
 
 
 
 
 
 
 
 
 
// router.post('/updateAppointmentPrescription', auth, (req,res) => {
//     console.log(req);
//     Appointment.findOneAndUpdate({_id : req.appointment.id}, {prescription: req.appointment.prescription }, {
//     new: true
//  }).then(appointment => res.json(appointment))
// })
 

 
router.post('/updateAppointment/:id', auth, (req,res) => {
    Appointment.findOneAndUpdate({_id : req.params.id}, {...req.body},
    { new: true })
    .then(appointment => res.json(appointment))
})
 





// const Service = require("../../models/Service");

// // @ROUTER 		POST /api/appointment/services
// // @des 		Create service
// // @Access 		PUBLIC
// router.post("/services", async (req, res) => {
// 	try {
// 		// CREATE STATUS OBJ
// 		const newService = new Service({
// 			title: req.body.title,
// 			form: req.body.form,
// 			to: req.body.to,
// 			spaces: req.body.spaces,
// 		});
// 		// SAVE TO DB
// 		const service = await newService.save();
// 		// RESPONSE
// 		res.json(service);
// 	} catch (e) {
// 		return res.status(404).json({ msg: "SERVER ERROR" });
// 	}
// });

// //@route 	GET api/appointment/services
// //@desc 	SEE ALL SERVICES
// //@access 	PUBLIC
// router.get("/services", async (req, res) => {
// 	try {
// 		const getAllServices = await Service.find().sort({ date: -1 });
// 		if (!getAllServices) {
// 			return res.status(400).json({ msg: "No Status" });
// 		}
// 		res.json({ getAllServices });
// 	} catch (e) {
// 		if (!e.kind == ObjectId) {
// 			return res.status(404).json({ msg: "Post not found" });
// 		}
// 		res.status(500).send("SERVER ERROR...");
// 	}
// });






// //@route 	GET api/appointment
// //@desc 	SEE SERVICES
// //@access 	PUBLIC
// router.get("/", async (req, res) => {
// 	try {
// 		const appointments = await Appointment.find().sort({ date: -1 });
// 		if (!appointments) {
// 			return res.status(400).json({ msg: "No Appointments" });
// 		}
// 		res.json({ appointments });
// 	} catch (e) {
// 		if (!e.kind == ObjectId) {
// 			return res.status(404).json({ msg: "Appointments not found" });
// 		}
// 		res.status(500).send("SERVER ERROR...");
// 	}
// });

// //@route 	GET api/appointment/pendinglist
// //@desc 	See Appointments pending list
// //@access 	PUBLIC
// router.get("/statuscount", async (req, res) => {
// 	try {
// 		const pendingAppointments = await Appointment.find(
// 			//{
// 			//status: "pending",
// 		//}
// 		);
// 		 const todaysAppointments = await Appointment.find(
// 			 //{
// 		// 	data: Date.now,
// 		// 
// 	//}
// 	);

// 		const totalAppointments = await Appointment.find();

// 		const statusCount = {
// 			pending: pendingAppointments.length,
// 			todays: todaysAppointments.length,
// 			total: totalAppointments.length,
// 			Patient: totalAppointments.length,
// 		};

// 		res.json(statusCount);
// 	} catch (e) {
// 		if (!error.kind == ObjectId) {
// 			return res.status(404).json({ msg: "Appointments not found" });
// 		}
// 		res.status(500).send("SERVER ERROR...");
// 	}
// });

//@route 	GET api/appointment/:date
//@desc 	See Appointments by date
//@access 	PUBLIC
router.get("/:date", auth, async (req, res) => {
    
	try {
		const appointments = await Appointment.find({'doctor._id': req.user.id ,date: req.params.date});
		if (!appointments) {
			return res.status(400).json({ msg: "No Appointments exists" });
		}
		res.json(appointments);
	} catch (e) {
		if (!error.kind == ObjectId) {
			return res.status(404).json({ msg: "Appointments not found" });
		}
		res.status(500).send("SERVER ERROR...");
	}
});

// //@route 	GET api/appointment/:id
// //@desc 	See Appointments by date
// //@access 	PUBLIC
// router.post("/action/:id", async (req, res) => {
// 	try {
// 		let getAppointment = await Appointment.findById(req.params.id);
// 		await Appointment.updateOne(
// 			{ _id: req.params.id },
// 			{ $set: { status: req.body.status } }
// 		);
// 		const appointment = await getAppointment.save();
// 		res.json(appointment);
// 	} catch (e) {
// 		console.error(e);
// 		res.status(500).send("SERVER ERROR!");
// 	}
// });
// //@route 	GET api/appointment/visitstatus/id
// //@desc 	See Appointments by date
// //@access 	PUBLIC
// router.post("/visitstatus/:id", async (req, res) => {
// 	try {
// 		let getAppointment = await Appointment.findById(req.params.id);

// 		if (getAppointment) {
// 			if (getAppointment.visited == false) {
// 				await Appointment.updateOne(
// 					{ _id: req.params.id },
// 					{ $set: { visited: true } }
// 				);
// 			} else {
// 				await Appointment.updateOne(
// 					{ _id: req.params.id },
// 					{ $set: { visited: false } }
// 				);
// 			}
// 		}
// 		const appointment = await getAppointment.save();
// 		res.json(appointment);
// 	} catch (e) {
// 		console.error(e);
// 		res.status(500).send("SERVER ERROR!");
// 	}
// });
 




module.exports = router;