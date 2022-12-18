const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    roomId:{
        type:String,
        required:true,
        maxlength: 10,
    },

    content:{
        type:String,
        required:true,
    },

    sendId:{
        type:String,
        required:true,
        maxlength: 10,
    },
    
    notReadId:{
        type:String,
        required:true,
        maxlength: 10,
    },

    time:{
        type:String,
        required:true,
    }
    
});

module.exports = mongoose.model("Message",MessageSchema);