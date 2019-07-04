const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ImageSchema = new Schema({
    img: { data: Buffer, contentType: String }
});

module.exports = Image = mongoose.model('image',ImageSchema);