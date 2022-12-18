const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const Users = require("./models/Users");
const Rooms = require("./models/Rooms");
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
    console.log("roomCreate");
    res.sendFile(__dirname + '/public/roomCreate.html');
});

router.post('/direct',async(req,res)=>{
    console.log("roomCreate");
    const myId = req.body.myId;
    const friendId = req.body.friendId;
    console.log(myId,friendId);
    await open();
    const roomData = await Rooms.find({$and:[{users:myId},{users:friendId}]});
    await close();
    console.log(roomData[0]);
    if(roomData.length != 0){
        console.log("すでに追加しています。");
            return res.status(400).json([
                {
                    message:"すでに追加しています。",
                },
            ]);
    };
    await open();
    const userData = await Users.find({id:friendId});
    await close();
    if(userData.length == 0){
        console.log("このIdは存在しません。");
            return res.status(400).json([
                {
                    message:"このIdは存在しません。",
                },
            ]);
    };

    const ids = [myId,friendId];
    await open();
    const roomId = await Rooms.find({}).count() + 1
    
    const createRooms = await Rooms.create({
        id:roomId,
        users:ids,
    });
    await close();

    res.status(200).json(createRooms);

});

router.get('/getUser',async(req,res)=>{
    console.log("roomCreate");
    const id = req.query.id;
    await open();
    const userData = await Users.find({id:id});
    await close();
    if(userData.length == 0){
        console.log("このIdは存在しません。");
            return res.status(400).json([
                {
                    message:"このIdは存在しません。",
                },
            ]);
    };

    const name = userData[0].name;
    
    const userInfo = {
        id:id,
        name:name,
    };

    res.status(200).json(userInfo);

});



module.exports = router;