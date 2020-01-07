const mongoose=require('mongoose');

mongoose.connect("mongodb+srv://nicolas:5dOHOGLzy7mGXEc6@udemy-dojtx.mongodb.net/buenam?retryWrites=true&w=majority",{
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