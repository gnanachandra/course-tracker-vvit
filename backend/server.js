const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const cors = require("cors");
const connectDB = require('./config/connectDB');
const router = require('./routes/adminRoutes');
const PORT = process.env.PORT || 4000;


const app = express();
app.use(express.json());
connectDB();
 
 

mongoose.connection.once('open',()=>{
    app.listen(PORT,()=>{
        console.log(`server listening on PORT ${PORT}`);
    });
});


app.get('/',(req,res)=>{
    res.json({message:"Hello world"});
})

app.use('/api/admin',router);