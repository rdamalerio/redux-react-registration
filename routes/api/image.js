const express = require('express');
const router = express.Router();
const multer  = require('multer');
const fs = require('fs');

//User Model
const Image = require('../../models/image')

// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
const upload = multer({ storage: storage })


// @route GET api/image
// @desc UPLOAD USER IMAGE
// @access Private
router.post('/',upload.single('avatar'),(req,res) =>{
    console.log(req.file);

    const a = new Image();
    a.img.data = fs.readFileSync(req.file.path);
    a.img.contentType = 'image/jpeg';
    a.save();

    res.json({ message: 'New image added to the db!' });
    
}); 


module.exports = router;