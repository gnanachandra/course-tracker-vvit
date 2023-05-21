const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MonogDB database connected");
    }
    catch(err)
    {
        console.log("Failed to connect",err);
    }
}
module.exports = connectDB;