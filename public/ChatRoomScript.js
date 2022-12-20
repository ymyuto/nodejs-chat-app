
var socket = io();

const inputDOM = document.getElementById("sendMessage");
const formDom = document.getElementById("form");
const messages = document.getElementById("messages");
const contentDom = document.getElementsByClassName("content");
function GetCookie_Value(keyName){
    let value = ""
    let r = document.cookie.split(';');//split(';')を使用しデータを1つずつに分ける
     r.forEach(function(data) {
       let content = data.split('=');//split('=')を使用しcookie名と値に分ける
       if(content[0].trim() == keyName) value = content[1];
     });
     console.log(value);
     return value;
};

async function GetMessage(){
    const messageData = await axios.get("chatRoom/getMessage",{
        params:{
            roomId:GetCookie_Value("roomId"),
        }
    });
    console.log(messageData);
    const allMessage = messageData.data.map((msg)=>{
        if(msg.sendId == GetCookie_Value("id")){
            return `
            <div class="myMessage">
                <div class="messageContent">
                    <p>${msg.content}</p>
                </div>
                <p class="time">${msg.time}</p>
            </div>
            `
        }else{
            return `
            <div class="friendMessage">
                <div class="messageContent">
                    <p>${msg.content}</p>
                </div>
                <p class="time">${msg.time}</p>
            </div>
            `
        };
    }).join("");

    messages.innerHTML = allMessage;
    window.scrollTo(0, messages.scrollHeight);
};

GetMessage();

const roomNameDom = document.getElementById("roomName");
console.log(GetCookie_Value("roomName"));
roomNameDom.innerText = GetCookie_Value("roomName");


let ContentText = "";

//Post
inputDOM.addEventListener("change", (e)=>{
    ContentText = e.target.value;
    console.log(ContentText);
});

formDom.addEventListener("submit",async (e)=>{
    e.preventDefault();

    const date = new Date(); //現在時刻を取得
        const y = date.getFullYear(), //西暦年
              m = date.getMonth() + 1, //月　
              d = date.getDate(), //日
              H = date.getHours(), //時
              M = date.getMinutes(); //分
    
        console.log(y,m,d,H,M);
        const time = `${y}/${m}/${d}/${H}:${M}`

    const roomId = GetCookie_Value("roomId");
    const myId = GetCookie_Value("id");
    const content = ContentText;
    ContentText = ""

    if(content.length > 0){
        console.log("send Message");
        try {

            socket.emit(`chat`,{
                roomId:roomId,
                content:content,
                time:time,
                userId:myId,
            });

            inputDOM.value = "";

            const message = await axios.post("/chatRoom/postMessage",{
                roomId:roomId,
                content:content,
                time:time,
                myId:myId
            });

            console.log("end");

        }catch(err){
            console.log(err.console);
        };
    };
    ContentText = ""
});

socket.on('chat', function(msg){
    if(msg.roomId != GetCookie_Value("roomId")) return;
    let message = "";
    if(msg.userId == GetCookie_Value("id")){
        message = `
        <div class="myMessage">
            <div class="messageContent">
                <p>${msg.content}</p>
            </div>
            <p class="time">${msg.time}</p>
        </div>
        `
    }else{
        message = `
        <div class="friendMessage">
            <div class="messageContent">
                <p>${msg.content}</p>
            </div>
            <p class="time">${msg.time}</p>
        </div>
        `
    }

    messages.insertAdjacentHTML('beforeend', message);
    window.scrollTo(0, messages.scrollHeight);
});