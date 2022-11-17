const crypto = require("crypto");
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
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

     isFirstRegister: {
        type: Boolean,
     },
     notificationsNumber: {
        type: String,
        default:"0"
     },
     isFirstTime: {
      type: Boolean,
   },
   notificationIsRead:{
      type: Boolean,
   },
     isApproved: {
        type: Boolean,
        required: false

     },
     isVerified: {
      type: Boolean,
      required: false,
      default: null

   },
 
     phone: {
        
      type: String
     },
     image: {
      type: String
     },
   
     documents: {
      type: Array,
   },
   notifications: {
      type: Array,
   },resetPasswordToken: String,
     resetPasswordExpire: Date,
     verifyToken:String,
     verifyExpire:Date,
});
userSchema.methods.getSignedJwtToken = function () {
   return jwt.sign({ id: this._id }, process.env.jwtSecret, {
     expiresIn: process.env.JWT_EXPIRE,
   });
 };
userSchema.methods.getResetPasswordToken = function () {
   const resetToken = crypto.randomBytes(20).toString("hex");
 
   // Hash token (private key) and save to database
   this.resetPasswordToken = crypto
     .createHash("sha256")
     .update(resetToken)
     .digest("hex");
 
   // Set token expire date
   this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes
 
   return resetToken;
 };


 userSchema.methods.getVerifyToken = function () {
   const verifyToken = crypto.randomBytes(20).toString("hex");
 
   // Hash token (private key) and save to database
   this.verifyToken = crypto
     .createHash("sha256")
     .update(verifyToken)
     .digest("hex");
 
   // Set token expire date
   this.verifyExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes
 
   return verifyToken;
 };

module.exports = user = mongoose.model('user', userSchema);