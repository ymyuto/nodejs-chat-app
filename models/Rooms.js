const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true,
        maxlength: 10,
    },
    users:[{
        type:String,
        required:true,
        maxlength: 10,
    }],
    
});

module.exports = mongoose.model("Rooms",RoomSchema);