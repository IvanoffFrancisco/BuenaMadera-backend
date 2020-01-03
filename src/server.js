const express=require('express');
const app=express();

//configuraciones
app.set("PORT",process.env.PORT || 4000);

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept,access-token ,Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// middleware
app.use(express.static(__dirname+"/storage/imgs"));
app.use(express.json());
//routes
app.use(require('./routers/ProductoRouter'));
app.use(require("./routers/Suscribirse"));

module.exports=app;