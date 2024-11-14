const express=require("express");
const app=express();
const mongoose=require('mongoose');
const path = require('path');
const cors=require('cors');
const dotenv=require('dotenv');
const bodyParser=require("body-parser");

require ('dotenv').config();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));

app.use(cors());


mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("mongodb connected");
})

const todorouter=require('./routes/approute');
app.use('/api',todorouter);

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','home.html'));
});




const PORT=3000;
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
    
})

