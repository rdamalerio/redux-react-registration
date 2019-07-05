const express = require('express');
const router = express.Router();
const multer  = require('multer');
const fs = require('fs');

//User Model
const Image = require('../../models/image')

var upload = multer({ dest: 'uploads/' })

// @route GET api/image
// @desc UPLOAD USER IMAGE
// @access Private
router.post('/',upload.single('avatar'),(req,res) =>{
    console.log(req.file);

    const a = new Image();
    a.img.data = fs.readFileSync(req.path,"utf8");
    a.img.contentType = 'image/jpeg';
    a.save();

    res.json({ message: 'New image added to the db!' });
    
}); 


module.exports = router;