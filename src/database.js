const mongoose=require('mongoose');

mongoose.connect(process.env.URL || "mongodb://localhost/buena_madera",{
    useCreateIndex:true,
    useFindAndModify:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
})

.then(()=>{
    console.log("conexion exitosa a mongodb")
})
.catch(()=>{
    console.log("error en la conexion a mongodb");
})