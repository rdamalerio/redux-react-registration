 const express = require('express');
 const router = express.Router();

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
        question: req.body.question,
        ans: req.body.ans
    });
    newUser.save().then(user => res.json(user))
 });

 
 // @route DELETE api/users/:id
 // @desc DELETE A user
 // @access private
 router.delete('/:id',(req,res) =>{
    User.findById(req.params.id)
        .then(user => User.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({ success : false}));
 });

module.exports = router;