const mongoose = require('mongoose');
require('dotenv').config();
const express = require('express');
const cors = require("cors");
const connectDB = require('./config/connectDB');
const adminRouter = require('./routes/adminRoutes');
const studentRouter = require('./routes/studentRoutes');
const  uploadFiles = require('./middleware/uploadToCloud');
const multer = require("multer")
const PORT = process.env.PORT || 5000;
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  });

const app = express();
app.use(cors());
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
app.post('/upload',upload.array('photos'),uploadFiles);
app.use('/api/admin',adminRouter);
app.use('/api/student',studentRouter);
