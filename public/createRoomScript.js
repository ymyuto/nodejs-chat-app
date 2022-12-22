const serchFormDom = document.getElementById("serchForm");
const inputDom = document.getElementById("serchId");
const addFormDom = document.getElementById("addForm");
const displayDom = document.getElementById("name");

var serchId = "";
var addId = "";

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

inputDom.addEventListener("change",(e)=>{
    serchId = e.target.value;
    console.log(serchId);
});

serchFormDom.addEventListener('submit',async(e)=>{
    e.preventDefault();
    if(serchId.length == 0)return;
    if(serchId == GetCookie_Value("id"))return;
    try{
        const userData = await axios.get('/roomCreate/getUser',{
            params:{
                id:serchId
            }
        });
    
        addId = userData.data.id;
        const name = userData.data.name;

        console.log(name);
    
        let display = `
        <h5>このユーザーが見つかりました</h5>
        <h3>${name}</h3>
        `;
    
        let addBtn = `
        <button id="addButton" type="submit" class="btn add">追加</button>
        `;
    
        displayDom.innerHTML = display;
        console.log("a");
        addFormDom.innerHTML = addBtn;

    }catch(err){
        console.log(err.response.data[0].message);
        let errdisplay = `
        <h5 class="err">${err.response.data[0].message}</h5>
        `;
        displayDom.innerHTML = errdisplay;
    };
});

addFormDom.addEventListener("submit",async()=>{
    if(addId.length == 0)return;
    try{
        const roomCreate = await axios.post('/roomCreate/direct',{
            myId:GetCookie_Value("id"),
            friendId:addId
        });
        window.alert("追加しました。");
    }catch(err){
        console.log(err);
        window.alert(err.response.data[0].message);
    };
})