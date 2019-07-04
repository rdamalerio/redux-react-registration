 const express = require('express');
 const router = express.Router();
 const bcrypt = require('bcryptjs');
 const config = require('config');
 const jwt = require('jsonwebtoken');
 const nodemailer = require("nodemailer");


 //User Model
 const User = require('../../models/user')

 // @route POST api/users
 // @desc CREATE USER
 // @access Private
 router.post('/',(req,res) =>{
    const newUser = new User({
        fname: req.body.fname,
        lname: req.body.lname,
        phone: req.body.phone,
        country: req.body.country,
        bday: req.body.bday,
        email: req.body.email,
        pass: req.body.pass,
        question: req.body.question,
        ans: req.body.ans
    });

    const { fname,lname,phone,country,bday, email, pass,question,ans } = req.body;

    // Simple validation
    if(!fname || !lname  || !email || !pass) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

      // Check for existing user
  User.findOne({ email })
  .then(user => {
    if(user) return res.status(400).json({ msg: 'Email '+email+' already exists' });

    const newUser = new User({
        fname,lname,phone,country,bday, email, pass,question,ans
    });

    // Create salt & hash
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.pass, salt, (err, hash) => {
            if(err) throw err;
            newUser.pass = hash;
            newUser.save()
            .then(user => {
                jwt.sign(
                { id: user.id },
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if(err) throw err;
                    res.json({
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                    });
                }
                )
            });
        })
        })
    })

    nodmailer(email).catch(console.error);

 });

 // async..await is not allowed in global scope, must use a wrapper
 // U use only nodemailer library for firing fake email
async function nodmailer(email){

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass // generated ethereal password
      }
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'damalerioroel@gmail.com', // sender address
      to: email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Thank you for registering my sample app", // plain text body
      html: "<b>Thank you for registering my sample app</b>" // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }


 // @route DELETE api/users/:id
 // @desc DELETE A user
 // @access private
 router.delete('/:id',(req,res) =>{
    User.findById(req.params.id)
        .then(user => User.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({ success : false}));
 });

 
module.exports = router;