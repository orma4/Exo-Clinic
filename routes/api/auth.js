const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
require('dotenv/config')

// User model
const User = require('../../models/User');

// @route           POST api/auth
// @description:    auth user
//@access           public
router.post('/', (req,res) => {
   const{ email, password } = req.body;

   //Validation
   if (!email || !password) {
      return res.status(400).json({msg: 'Please enter all fields'});
   }

   //Check for existing user
   User.findOne({email})
   .then(user => {
      if(!user) return res.status(400).json({msg: 'user Does not exists'});
  
      //Validate password
      bcrypt.compare(password,user.password)
      .then(isMatch => {
          if(!isMatch) return res.status(400).json({msg: 'Invalid Credentials'});

          jwt.sign(
            {id: user.id},
            process.env.jwtSecret || config.get('jwtSecret'),
            {expiresIn: 3600}, //OPTIONAL!!!!!
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
      })

   });
});


// @route           POST api/auth/updateDocState
// @description:    get user data
//@access           private

router.post('/updateDocState', auth, (req,res) => {
   User.findOneAndUpdate({_id : req.user.id}, {isFirstTime: false }, {
   new: true
}).then(user => res.json(user))

  
});


// @route           GET api/auth/user
// @description:    get user data
//@access           private

router.get('/user', auth, (req,res) => {
   User.findById(req.user.id)
   .select('-password')
   .then(user => {
      res.json({
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
      );
   }
)
});


// @route           GET api/auth/user
// @description:    get users data
//@access           private

router.get('/getApprovedDoctors', auth, (req,res) => {
   User.find({isApproved: "true"})
   .select('-password')
   .then(users => res.json(users))
});

// @route           POST api/auth/id
// @description:    update user data
// @access          private

router.post('/:id', auth, (req,res) => {
   User.findOneAndUpdate({_id : req.user.id}, {...req.body}, {
   new: true
}).then(user => res.json({
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
))
})

module.exports = router;