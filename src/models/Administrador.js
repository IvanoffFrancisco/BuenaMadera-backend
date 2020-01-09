const {Schema,model}=require('mongoose');
const bcrypt=require('bcryptjs');
const SchemaAdmin=new Schema({
    email:String,
    usuario:String,
    password:String
})

SchemaAdmin.methods.HashPassword=async (password)=>{
    const pass=await bcrypt.genSalt(10);
    return bcrypt.hash(password,pass);
}

SchemaAdmin.methods.ValidarPassword=function(password){
    return bcrypt.compare(password,this.password);
}

module.exports=model("Administradores",SchemaAdmin);