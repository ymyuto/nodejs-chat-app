const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const Users = require("./models/Users");
const bcrypt = require("bcrypt");
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

router.get("/",(req,res)=>{
    console.log("ログイン画面");
    res.sendFile(__dirname + "/public/rogin.html");
});

router.get("/myData",async(req,res)=>{
    const id = req.query.id;
    const password = req.query.password;

    console.log("ユーザーチェック");

    console.log(id);
    await open();
    const user = await Users.find({id:id});
    await close();
    if(user.length == 0){
        console.log("このIdは存在しません。");
            return res.status(400).json([
                {
                    message:"このIdは存在しません。",
                },
            ]);
    };

    const dataPassword =  user[0].password;
    console.log(dataPassword);

    bcrypt.compare(password,dataPassword)
    .then(resp => {
        if(resp){
            console.log("正しいパスワード");
            res.status(200).json({
                id:user[0].id,
                name:user[0].name,
            });
        }
      })
      .catch(error => {
        console.log(error);
      });

});





module.exports = router;

