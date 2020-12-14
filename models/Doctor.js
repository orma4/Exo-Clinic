const mongoose = require('mongoose');
// const { default: doctor } = require('../client/src/reducers/doctorReducer');
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
        required: true,
       // unique: true
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

   exp: {
      type: String,
      required: true
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

   date: {
      type: Date,
      default: Date.now
  }

});

module.exports = doctor = mongoose.model('doctor details', doctorSchema);