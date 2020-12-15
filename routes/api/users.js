const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
// User model
const User = require('../../models/User');
require('dotenv/config')

// @route           POST api/users
// @description:    register new user
//@access           public
router.post('/', (req,res) => {
   const{ name, email, password, userType, isFirstTime, isApproved, phone, image, recommendations} = req.body;

   //Validation
   if (!name || !email || !password) {
      return res.status(400).json({msg: 'Please enter all fields'});
   }

   //Check for existing user
   User.findOne({ email })
   .then(user => {
      if(user) return res.status(400).json({msg: 'User already exists'});
      
  
      const newUser = new User({
         name,
         email,
         password,
         userType,
         isFirstTime,
         isApproved, 
         phone,
         image,
         recommendations
      });
      
      //Create Salt & Hash
      bcrypt.genSalt(10,(err,salt) => {
         bcrypt.hash(newUser.password, salt, (err,hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save()
            .then(user => {

               jwt.sign(
                  {id: user.id},
                  process.env.jwtSecret || config.get('jwtSecret'),
                  {expiresIn: 3600},            //OPTIONAL!!!!!
                  (err,token) => {
                     if(err) throw err;
                     res.json({
                        token: token,
                        user: {
                           id: user.id,
                           name: user.name,
                           email: user.email,
                           userType: user.userType,
                           isFirstTime: user.isFirstTime,
                           isApproved: user.isApproved, 
                           phone: user.phone,
                           image: user.image,
                           recommendations: user.recommendations
                        }
                     });
                  }
               )

              
            });
         });
      });
   });
});


module.exports = router;