const {Schema,model}=require('mongoose');

const SchemaProducto=new Schema({
    imagen_central:String,
    galeria:[
        {
            type:String,
        }
    ],
    nombre:{
        type:String,
        required:true
    },
    descripcion:{
        type:String,
        required:true
    },
    categoria:{
        type:String,
        required:true
    },
    cantidad:{
        type:Number,
        required:true
    },
    precio:{
        type:Number,
        required:true
    },
    descuento:{
        type:Number
    },
    envio:["fontana","resistencia","barranqueras"],
    fecha:{
        type:Date,
        default:Date.now()
    },
    estado:{
        type:String
    },
})

module.exports=model("Producto",SchemaProducto);