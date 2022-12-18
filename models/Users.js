const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true,
        maxlength: 10,
    
    },
    name:{
        type: String,
        required:true,
        maxlength: 10,

    },
    password:{
        type: String,
        required:true,

    },

});

module.exports = mongoose.model("Users",UserSchema);