const mongoose = require("mongoose");

const RoomColectionSchema = new mongoose.Schema({
    userid:{
        type:String,
        required:true,
        maxlength: 4,
    
    },
    rooms:[{
        type: mongoose.Scheme.Types.ObnectId,
        ref: "Rooms"
    }]
});

module.exports = mongoose.model("Users",RoomColectionSchema);