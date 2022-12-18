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
    console.log("新規登録画面");
    res.sendFile(__dirname + "/public/register.html");
});

router.post("/",async (req,res)=>{
     try{
         //バリデーションチェック
         console.log("バリデーションチェック開始");
         console.log(req.body);
         const bodyId = req.body.id;
         const bodyName = req.body.name;
         const bodyPassword = req.body.password;
         if(!IdCheck(bodyId)||!NameCheck(bodyName)||!PasswordCheck(bodyPassword)){
            console.log("barierror");
            return res.status(400).json([
                {
                    message:"入力された値が正しくありません。",
                },
            ]);
          }
         console.log("バリデーションチェック通過");
 
         //DBにユーザーが存在しているのかチェック
         await open();
         const users = await Users.find({id:bodyId});
         await close();
         if(users.length){
            console.log("データが重複しています。");
            return res.status(400).json([
                {
                    message:"すでにそのIDは使われています。",
                },
            ]);
         }
 
         //パスワードの暗号化
         let hashedPassword = await bcrypt.hash(bodyPassword,10);
         console.log(hashedPassword);

         await open();
         const createUsers = await Users.create({
            id:bodyId,
            name:bodyName,
            password:hashedPassword,
         });
         await close();
         console.log("ja");
         return res.status(200).json(createUsers);
 
     }catch(err){
         console.log(err);
 
     };
});

//半角チェック
function IsSingleByte(str){
    if (str.match(/^[^\x01-\x7E\xA1-\xDF]+$/)) return false;
    return true;
};

function IdCheck(id){
    if(id.length < 4 || id.length > 10)return false;
    if(!IsSingleByte(id))return false;
    return true;
};

function NameCheck(name){
    if(name.length > 10)return false;
    return true;
};

function PasswordCheck(password){
    if(password.length < 4 || password.length > 10)return false;
    if(!IsSingleByte(password))return false;
    return true;
};

module.exports = router;