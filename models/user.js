const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
    fname:{
        type:String
    },
    lname:{
        type:String
    },
    phone:{
        type:String
    },
    country:{
        type:String
    },
    bday:{
        type:String
    },
    email:{
        type:String
    },
    pass:{
        type:String
    },
    question:{
        type:String
    },
    ans:{
        type:String
    }
});

module.exports = User = mongoose.model('user',UserSchema);