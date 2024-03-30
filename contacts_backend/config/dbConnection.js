const mongoose = require("mongoose");

//conenct to mongodb database
const connectDb = async () => {
    try{
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log("DATABASE CONNECTED", 
        connect.connection.host,
        connect.connection.name);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDb;