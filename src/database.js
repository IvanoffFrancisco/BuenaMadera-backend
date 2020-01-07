const mongoose=require('mongoose');

mongoose.connect("mongodb+srv://BuenaMadera:V3YNg618sgDdfOGr@cluster0-gxq7o.mongodb.net/test?retryWrites=true&w=majority",{
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