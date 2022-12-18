require('dotenv').config();
const mongoose = require("mongoose");

class DbConnection{

    open(){
        mongoose.connect(
            process.env.DBURL
            ).then(()=>console.log("db connect"))
             .catch((err)=>console.log(err));
    };
    
    close(){
        mongoose.connection.close()
        .then(()=>console.log("db connect"))
        .catch((err)=>console.log(err));
    };

}

export{DbConnection};


