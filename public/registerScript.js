
const inputIdDOM = document.getElementById("id");
const inputNameDOM = document.getElementById("name");
const inputPasswordDOM = document.getElementById("password");
const formDom = document.getElementById("form");

let inputIdText = "";
let inputNameText = "";
let inputPasswordText = "";

inputIdDOM.value = "";
inputNameDOM.value = "";
inputPasswordDOM.value = "";

//Post
inputIdDOM.addEventListener("change", (e)=>{
    inputIdText = e.target.value;
    console.log(inputIdText);
});

inputNameDOM.addEventListener("change", (e)=>{
    inputNameText = e.target.value;
    console.log(inputNameText);
});

inputPasswordDOM.addEventListener("change", (e)=>{
    inputPasswordText = e.target.value;
    console.log(inputPasswordText);  
});

formDom.addEventListener("submit",async (e)=>{
    e.preventDefault();

    if(inputIdText && inputNameText && inputPasswordText){
        console.log("add data");
        try {
            const register = await axios.post("/register",{
                id:inputIdText,
                name:inputNameText,
                password:inputPasswordText,
            });
            window.alert("登録が完了しました。");
            inputIdDOM.value = "";
            inputNameDOM.value = "";
            inputPasswordDOM.value = "";

        }catch(err){
            console.log(err.console);
            window.alert(err.response.data[0].message);
        }
    };
});

