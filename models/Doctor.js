const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema ({
   _id: {
      type: String
   },

   name: {
      type: String,
      required: true  
   },
   image: {
        type: String,
    },

   category: {
      type: String,
      required: true  
   },

   description: {
      type: String,
      required: true
   },

   fee: {
      type: String,
      required: true
   },

   education: {
      type: String,
   },
   exp: {
      type: String,
      required: true
   },
   specialization: {
      type: String,
   },
   servicesOffered: {
      type: String,
   },
 
   phone: {
        type: String,
        required: true
      //  unique: true
     },

   address: {
        type: String,
        required: true
     },
     feedbacks: {
      type: Array,
      required: true
   },
     takenAppointments: {
      type: Array,
      required: true
   },
   date: {
      type: Date,
      default: Date.now
   
  },
  recommendations: {
   type: Array,
   default:[]
  },

});

module.exports = doctor = mongoose.model('doctor details', doctorSchema);