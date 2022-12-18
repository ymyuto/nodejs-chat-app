// const { default: axios } = require("axios");

const inputIdDOM = document.getElementById("id");
const inputPasswordDOM = document.getElementById("password");
const formDom = document.getElementById("form");

let inputIdText = "";
let inputPasswordText = "";

inputIdDOM.addEventListener("change",(e)=>{
    inputIdText = e.target.value;
    console.log(inputIdText);
});

inputPasswordDOM.addEventListener("change",(e)=>{
    inputPasswordText = e.target.value;
    console.log(inputPasswordText);
});

formDom.addEventListener("submit", async(e)=>{
    e.preventDefault();
    if(inputIdText && inputPasswordText){
        console.log("add");
        try{
            let userInfo = await axios.get('/rogin/myData',{
                params:{
                    id:inputIdText,
                    password:inputPasswordText,
                }
            });

            console.log(userInfo);

            const {id,name} = userInfo.data;
            console.log(id,name);
            document.cookie = `id=${id};`;
            document.cookie = `name=${name};`;

            location.href = '/myPage';
            
        }catch(err){
            console.log(err);
            window.alert(err.response.data[0].message);
        };
    };
});