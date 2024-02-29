const express=require('express');
const mongoose = require('mongoose');
const path = require("path");
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');
const dbConnection = require('./config/database')

require('dotenv').config();



const app=express();




app.use(cookieParser());
app.use(express.json())
app.use(bodyParser.urlencoded());

//connect to db
const url=process.env.URL;
dbConnection(url);



app.use(require('./routes/main'))

const port=process.env.PORT;
app.listen(port,()=>{
    console.log(`server start on ${port}`);
})
