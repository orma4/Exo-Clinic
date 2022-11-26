const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// User model
const User = require("../../models/User");
require("dotenv/config");
// const { getResetRequest, createResetRequest } = require("../../models/resetRequests");
// const sendResetLink = require("../../models/sendEmail");

const nodemailer = require("nodemailer");
const port = process.env.PORT || 3000;

const sendEmail = (options) => {
  //    var smtpConfig = {
  //       host: 'smtp.gmail.com',
  //       port: 465,
  //       secure: true, // use SSL
  //       auth: {
  //           user: process.env.EMAIL_USERNAME,
  //           pass: process.env.EMAIL_PASSWORD
  //       }
  //   };
  //   var transporter = nodemailer.createTransport(smtpConfig);
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    html: options.text,
  };

  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
    }
  });
};

module.exports = sendEmail;

// @desc    Forgot Password Initialization
router.post("/forgotpassword", async (req, res, next) => {
  // Send Email to email provided but first check if user exists
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({ error: "The user does not exist!" });
    }
    console.log(user);
    // Reset Token Gen and add to database hashed (private) version of token
    const resetToken = user.getResetPasswordToken();

    await user.save();

    let resetUrl = null;

    // Create reset url to email to provided email
    if (process.env.NODE_ENV === "production") {
      resetUrl = `https://exoclinic.cyclic.app/verifyemail/${resetToken}`;
    } else {
      resetUrl = `http://localhost:3000/verifyemail/${resetToken}`;
    }

    // HTML Message
    const message = `
       <h1>You have requested a password reset</h1>
       <p>Please click the following link:</p>
       <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
     `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Password Reset Request",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {
      console.log(err);

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      return res.status(200).json({ error: "Email could not be sent" });
    }
  } catch (err) {
    next(err);
  }
});

// @desc    Reset User Password
router.put("/passwordreset/:resetToken", async (req, res, next) => {
  // Compare token in URL params to hashed token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(200).json({ error: true });
    }

    bcrypt.genSalt(10, async (err, salt) => {
      bcrypt.hash(req.body.password, salt, async (err, hash) => {
        if (err) throw err;
        user.password = hash;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();
      });
    });
    res.status(201).json({
      success: true,
      data: "Password Updated Success",
      token: user.getSignedJwtToken(),
    });
  } catch (err) {
    next(err);
  }
});

// @desc    send otp to admin email
router.post("/otpEmail", async (req, res, next) => {
  // Send Email to email provided but first check if user exists
  const { otp } = req.body;

  try {
    // HTML Message
    const message = `
       <h1>You have requested a otp code:${otp}</h1>
       <p>Please make a put request to the following link:</p>

     `;

    try {
      await sendEmail({
        to: "samisaliba14@gmail.com",
        subject: "Otp token Request",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {
      console.log(err);

      return next(new ErrorResponse("Email could not be sent", 500));
    }
  } catch (err) {
    next(err);
  }
});

// @route           GET api/users
// @description:    get all users
//@access           public

router.get("/", (req, res) => {
  User.find()
    .sort({ date: -1 })
    .then((users) => res.json(users));
});

// @desc    Forgot Password Initialization
router.post("/verify", async (req, res, next) => {
  // Send Email to email provided but first check if user exists
  const { email } = req.body;

  try {
    // Verify Token Gen and add to database hashed (private) version of token
    // const resetToken = crypto.randomBytes(20).toString("hex");

    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ success: false, data: "Email not Sent" });
    }
    const verifyToken = user.getVerifyToken();
    await user.save();
    // const {_id}=user;
    var resetUrl = null;
    // Create verify url to email to provided email
    if (process.env.NODE_ENV === "production") {
      resetUrl = `https://exoclinic.cyclic.app/verifyemail/${verifyToken}`;
    } else {
      resetUrl = `http://localhost:3000/verifyemail/${verifyToken}`;
    }

    // HTML Message
    const message = `
      <h1>You account needs to be verified</h1>
      <p>Please click the following link to verify your accont:</p>
      <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    `;

    try {
      await sendEmail({
        to: email,
        subject: "Verify Email Request",
        text: message,
      });

      res.status(200).json({ success: true, data: "Email Sent" });
    } catch (err) {
      res.status(500).json({ success: false, data: "Email not Sent" });

      user.verifyToken = undefined;
      user.verExpire = undefined;

      await user.save();
    }
  } catch (err) {
    next(err);
  }
});

// @route           GET api/users
// @description:    get all users
//@access           public

// router.post('/postverify'  , (req,res) => {

//   const { id } = req.body;
//   User.findOneAndUpdate({_id:id},{isVerified:true},
//     { new: true })
//          .sort({ date: -1 })
//          .then(user => res.json(user))
// });
router.post("/postverify/:verifyToken", async (req, res, next) => {
  // Compare token in URL params to hashed token

  const verifyToken = crypto
    .createHash("sha256")
    .update(req.params.verifyToken)
    .digest("hex");

  try {
    const user = await User.findOneAndUpdate(
      {
        verifyToken,
        verifyExpire: { $gt: Date.now() },
      },
      { isVerified: true },
      { new: true }
    );

    if (!user) {
      res.status(400).json("Invalid Token");
    }
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      data: "Password Updated Success",
      token: user.getSignedJwtToken(),
    });
  } catch (err) {
    next(err);
  }
});

// @route           POST api/users/checkEmailExists
// @description:    register new user
//@access           public
router.post("/checkEmailExists", (req, res) => {
  const { email } = req.body;

  //Check for existing user
  User.findOne({ email }).then((user) => {
    if (user) return res.json(true);
    else return res.json("null");
  });
});

// @route           POST api/users
// @description:    register new user
//@access           public
router.post("/", (req, res) => {
  const {
    name,
    email,
    password,
    userType,
    isFirstTime,
    isApproved,
    phone,
    image,
    isFirstRegister,
  } = req.body;

  //Validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //Check for existing user
  User.findOne({ email }).then((user) => {
    if (user) return res.status(400).json({ msg: "userExists" });

    const newUser = new User({
      name,
      email,
      password,
      userType,
      isFirstTime,
      isApproved,
      phone,
      image,
      isFirstRegister,
    });

    //Create Salt & Hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            process.env.jwtSecret,
            { expiresIn: 3600 }, //OPTIONAL!!!!!
            (err, token) => {
              if (err) throw err;
              res.json({
                token: token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  notifications: user.notifications,
                  userType: user.userType,
                  isFirstTime: user.isFirstTime,
                  isApproved: user.isApproved,
                  phone: user.phone,
                  image: user.image,
                  isVerified: user.isVerified,
                  isFirstRegister: user.isFirstRegister,
                },
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
