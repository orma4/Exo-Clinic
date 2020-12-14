const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name: {
       type: String,
       required: true  
    },
    date: {
        type: Date,
        default: Date.now
    },

     email: {
        type: String,
        required: true,
        unique: true
     },

     password: {
        type: String,
        required: true  
     },

     userType: {
        type: String,
        required: true
     },

     isFirstTime: {
        type: Boolean,
        required: false
     },

     isApproved: {
        type: Boolean,
        required: false

     },
     phone: {
      type: String
     },
     image: {
      type: String
     },
     recommendations: {
      type: Number
     }
});

module.exports = user = mongoose.model('user', userSchema);