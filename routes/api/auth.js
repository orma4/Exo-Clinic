const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
require('dotenv/config')


// User model
const User = require('../../models/User');
 // @route           GET api/auth
// @description:    get User image
//@access           public
router.get('/getUserImage/:id', auth,(req,res) => {
   User.findById(req.params.id)
       .then(user => res.json(user.image));
});
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
            process.env.jwtSecret,
            {expiresIn: 3600}, //OPTIONAL!!!!!
            (err,token) => {
               if(err) { console.log(err)
                  throw err
              };  
            res.json({
                  token: token,
                  user: {
                     id: user.id,
                     name: user.name,
                     email: user.email,
                     userType: user.userType,
                     isFirstTime: user.isFirstTime,
                     isApproved: user.isApproved,
                     isVerified:user.isVerified,
                     phone: user.phone,
                     image: user.image,
                     documents:user.documents,
                     notifications:user.notifications,
                     notificationIsRead:user.notificationIsRead,
                     notificationsNumber:user.notificationsNumber



                  }
               });
            }
         )
      })

   });
});


// @route           POST api/auth/updateDocState
// @description:   update isFirstTime
//@access           private

router.post('/updateDocState', auth, (req,res) => {
   User.findOneAndUpdate({_id : req.user.id}, {isFirstTime: false }, {
   new: true
}).then(user => res.json(
   {
      id: user._id,
      name: user.name,
      email: user.email,
      userType: user.userType,
      isFirstTime: user.isFirstTime,
      isApproved: user.isApproved,
      isVerified:user.isVerified,
      phone: user.phone,
      image: user.image,
      documents:user.documents,
      notifications:user.notifications,
      notificationIsRead:user.notificationIsRead,
      notificationsNumber:user.notificationsNumber
   }

))

  
});


// @route           POST api/auth/approveDoctor
// @description:    approve a doctor
//@access           private

router.post('/approveDoctor', auth, (req,res) => {
   User.findOneAndUpdate({_id : req.body._id}, {isApproved:req.body.isApproved}, {
   new: true
}).then(user => res.json(user))

  
});
// @route           DELETE api/auth/deleteUser/:id
// @description:    delete a user
// @access           private
router.delete('/deleteUser/:id', auth, (req,res) => {
   User.findById(req.params.id)
       .then(user  => user.remove()
       .then(() => res.json({...user._doc})))
       .catch(err => res.status(404).json({success: false}));
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
            isVerified:user.isVerified,
            documents:user.documents,
            notifications:user.notifications,
            notificationIsRead:user.notificationIsRead,
            notificationsNumber:user.notificationsNumber




         }
      );
   }
)
});


// @route           GET api/auth/user
// @description:    get approved doctors
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
   isVerified:user.isVerified,
   phone: user.phone,
   image: user.image,
   documents:user.documents,
   notifications:user.notifications,
   notificationsNumber:user.notificationsNumber


} 
))
})


// @route           POST api/auth/id
// @description:    add user Document
// @access          private

router.post(`/addDocument/:id`, auth, async (req,res) => {
  var documents=[];
  var user=await User.findById(req.params.id);
  documents=  user.documents  
  documents.push({fileName:req.body.fileName,
   document:req.body.document,docId:req.body.docId,date:req.body.date})
           
   User.findOneAndUpdate({_id : req.params.id}, {documents:documents}, {
   new: true
}).then(user => res.json({
   _id: user.id,
   name: user.name,
   email: user.email,
   userType: user.userType,
   isFirstTime: user.isFirstTime,
   isApproved: user.isApproved,
   isVerified:user.isVerified,
   phone: user.phone,
   image: user.image,
   documents:user.documents,
   notifications:user.notifications,
   notificationsNumber:user.notificationsNumber

} 
))
})
// @route           POST api/addNotification
// @description:    add   user notification
//@access           public
router.post('/addNotification/:id', auth,async(req,res) => {
  var notifications=[];
  var user=await User.findById(req.params.id);
  notifications = user.notifications;
           
  notifications=[{userId:req.body.notifyBy,
   notification:req.body.notification,date:req.body.date},...notifications]
   const notificationsNumber=parseInt(user.notificationsNumber,10)+1;
           console.log(notifications.length,user.notificationsNumber,parseInt(user.notificationsNumber,10))
           User.findOneAndUpdate({_id : req.params.id}, {notifications:notifications,notificationsNumber:notificationsNumber,notificationIsRead:false},
               { new: true }).then(r=>res.json({...r._doc}))
  
});

// @route           POST api/readNotification
// @description:    read  user notification
//@access           public
router.get('/readNotification/:id', auth,(req,res) => {
           User.findOneAndUpdate({_id : req.params.id}, {notificationIsRead:true,notificationsNumber:"0"},
               { new: true }).then(user => res.json({
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  userType: user.userType,
                  isFirstTime: user.isFirstTime,
                  isApproved: user.isApproved,
                  isVerified:user.isVerified,
                  phone: user.phone,
                  image: user.image,
                  documents:user.documents,
                  notifications:user.notifications,
                  notificationsNumber:user.notificationsNumber
               
               } 
               ))
  
});

router.get('/userIsExsist/:id', auth , (req,res) => {

   User.findById(req.params.id).then(user=>{
  if(user){
   res.status(200).json({msg: 'userExists',flag:true});
  }
  else
  {
   res.status(200  ).json({msg: 'userNotExists',flag:false});
  }
}).catch(err=>{if(err) res.status(200  ).json({msg: 'erorr',flag:false})})
});


// @route           POST api/deleteNotifications
// @description:    delete   user notification
//@access           public
router.delete('/deleteNotifications/:id', auth,async(req,res) => {
   var notifications=[];
   var user=await User.findById(req.params.id);
            User.findOneAndUpdate({_id : req.params.id}, {notifications:[],notificationsNumber:"0",notificationIsRead:true},
                { new: true }).then(user => res.json({
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  userType: user.userType,
                  isFirstTime: user.isFirstTime,
                  isApproved: user.isApproved,
                  isVerified:user.isVerified,
                  phone: user.phone,
                  image: user.image,
                  documents:user.documents,
                  notifications:user.notifications,
                  notificationsNumber:user.notificationsNumber
               
               } 
               ))
   
 });












// router.patch("/reset", (req, res) => {
//    const thisRequest = getResetRequest(req.body.id);
//    if (thisRequest) {
//        const user = getUser(thisRequest.email);
//        bcrypt.hash(req.body.password, 10).then(hashed => {
//            user.password = hashed;
//            updateUser(user);
//            res.status(204).json();
//        })
//    } else {
//        res.status(404).json();
//    }
// });

module.exports = router;