const mongoose=require('mongoose');

mongoose.connect("mongodb+srv://nicoo:O9UuAqW29iPXWrkT@udemy-dojtx.mongodb.net/buena_madera?retryWrites=true&w=majority",{
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