const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const PORT = 3000;
const io = require('socket.io')(server);
// require('dotenv').config();
// const mongoose = require("mongoose");
// //データコネクション
// mongoose.connect(
//     process.env.DBURL
//     ).then(()=>console.log("db connect"))
//      .catch((err)=>console.log(err));

require('dotenv').config();
const mongoose = require("mongoose");

function open(){
    mongoose.connect(
        process.env.DBURL
        ).then(()=>console.log("db connect"))
         .catch((err)=>console.log(err));
};

function close(){
    mongoose.connection.close()
        .then(()=>console.log("db connect"))
        .catch((err)=>console.log(err));
};

// open();
// close();

app.use(express.static("public"));

const register = require("./register");
app.use("/register",register);

const rogin = require("./rogin");
app.use("/rogin",rogin);

const myPage =  require("./myPage");
app.use("/myPage",myPage);

const roomCreate =  require("./roomCreate");
app.use("/roomCreate",roomCreate);

const chatRoom = require("./chatRoom");
app.use("/chatRoom",chatRoom);

app.get("/",(req,res)=>{
    res.sendFile(__dirname + '/public/main.html');
    console.log(__dirname);
});

server.listen(process.env.PORT||PORT,()=>{
    console.log("サーバーが起動しました");
});

io.on("connection",(socket)=>{
    console.log("message");
    socket.on('chat', function(msg){
        io.emit('chat', msg);
    });

});

