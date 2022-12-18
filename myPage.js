const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const Users = require("./models/Users");
const Rooms = require("./models/Rooms");
require('dotenv').config();
const mongoose = require("mongoose");

async function open (){
    await mongoose.connect(
        process.env.DBURL
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
    res.sendFile(__dirname + '/public/myPage.html');
});

router.get('/getRoom',async(req,res)=>{
    console.log("roomget");
    const userId = req.query.userId;
    console.log(userId);
    await open();
    const roomData = await Rooms.find({users:userId});
    let roomInfos = [];

    for(let i=0;i<roomData.length;i++){
        const roomId = roomData[i].id;
        const users = roomData[i].users;
        console.log(users);
        const friendUserId = users.find(function(user){return user !== userId});
        console.log(friendUserId);
        const userData = await Users.find({id:friendUserId});
        console.log(userData);
        const name = userData[0].name;
        roomInfos.push({
            id:roomId,
            name:name,
        });
    };

    res.status(200).json(roomInfos);
    await close();


});



module.exports = router;