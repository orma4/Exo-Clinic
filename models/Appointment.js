const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema ({
   doctor: {
      type: Object,
      required: true  
   },
   patient: {
      type: Object,
      required: true  
   },
    date: {
        type: String,
        //default: Date.now
    },

    reason: {
        type: String,
        required: true,
     },

     time: {
        type: String,
        required: true  
     },

     status: {
        type: String,
     },

     report: {
      type: String,
   }
});

module.exports = appointment = mongoose.model('appointment', appointmentSchema);