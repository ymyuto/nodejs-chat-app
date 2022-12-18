const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const Users = require("./models/Users");
const Rooms = require("./models/Rooms");
const Message = require("./models/Message");
require('dotenv').config();
const mongoose = require("mongoose");

async function open (){
    await mongoose.connect(
        process.env.HEROKUDB||process.env.DBURL
        ).then(()=>console.log("db connect"))
         .catch((err)=>console.log(err));
};

async function close(){
   await mongoose.connection.close()
        .then(()=>console.log("db close"))
        .catch((err)=>console.log(err));
};


router.use(bodyParser.urlencoded({ extended: true }))
router.use(express.json());

router.get('/',(req,res)=>{
    console.log("myPage");
    res.sendFile(__dirname + '/public/chatRoom.html');
});

router.get('/getMessage',async(req,res)=>{
    const roomId = req.query.roomId;
    await open();
    const messageData = await Message.find({roomId:roomId});
    await close();
    res.status(200).json(messageData);
});

router.post('/postMessage',async(req,res)=>{
    const roomId = req.body.roomId;
    const sendId = req.body.myId;
    await open();
    const roomData = await Rooms.find({id:roomId});
    const receptionId = roomData[0].users.filter(function(value){
        return value != sendId;
    });
    console.log(roomData[0].users);
    const content = req.body.content;
    const time = req.body.time;

    console.log({
        roomId:roomId,
        content:content,
        sendId:sendId,
        notReadId:receptionId[0],
        time:time,
    });

    await Message.create({
        roomId:roomId,
        content:content,
        sendId:sendId,
        notReadId:receptionId[0],
        time:time,
    });
    await close();
    return res.status[200];
});


module.exports = router;