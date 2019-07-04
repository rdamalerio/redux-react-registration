const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');


//User Model
const User = require('../../models/user')

// @route POST api/update
// @desc UPDATE USER
// @access Private
router.post('/',(req,res) =>{

   const { id,fname,lname,phone,country,bday, email,question,ans } = req.body;
  
   // Simple validation
   if(!fname || !lname  || !email) {
       return res.status(400).json({ msg: 'Please enter all fields' });
   }
   console.log(req.body);
   // Check for existing and update
   User.findOneAndUpdate({"_id": id  } , {$set: {"fname": fname, "lname": lname, "phone": phone, "country": country,"bday":bday,"question":question,"ans":ans}} ,{ new: true }, (err , data) => {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
   });

}); 


module.exports = router;