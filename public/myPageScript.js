
const GetCookie_userId = function(){
    let r = document.cookie.split(';');//split(';')を使用しデータを1つずつに分ける
    let userId = 0
     r.forEach(function(value) {
       let content = value.split('=');//split('=')を使用しcookie名と値に分ける
       if(content[0].trim() == "id") userId = content[1];
     });
      return userId;
};


const GetRooms = async()=>{

    const userId = GetCookie_userId();

    console.log(userId);
   
    let rooms = await axios.get('myPage/getRoom',{
        params:{
            userId:userId,
        }

    });
    console.log(rooms);
    let ids =[];
    const allRooms = rooms.data.map((room)=>{
        const {id,name} = room;
        ids.push(id);
        return `
        <div class="room" id="${id}">
        <img src="raion.jpg">
        <p>${name}</p>
      </div>
        `
    }).join("");
    const roomsDom = document.querySelector(".rooms");
    roomsDom.innerHTML = allRooms;

    console.log(ids);

    let event = ids.forEach((id)=>{
        console.log(id);
        const roomDom = document.getElementById(id);

        roomDom.addEventListener('click',async(e)=>{
            console.log("message");
            console.log(e.currentTarget.id);
            const roomId = e.currentTarget.id;
            const element = document.getElementById(id);
            const children = element.children.item(1);
            console.log(children.textContent);
        
            document.cookie = `roomId=${roomId}`
            document.cookie = `roomName=${children.textContent}`
        
            location.href = '/chatRoom';
        });
    });

};

GetRooms();
