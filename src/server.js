const express=require('express');
const app=express();

//configuraciones
app.set("PORT",process.env.PORT || 4000);

//middleware
app.use(express.json());

//routes

module.exports=app;