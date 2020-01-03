const {Schema,model}=require('mongoose');

const SchemaSuscripcion=new Schema({
    email:String,
});

module.exports=model("suscripcion",SchemaSuscripcion);