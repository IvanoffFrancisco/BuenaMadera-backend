var nodemailer = require('nodemailer');
const productoController={};
const producto=require('../models/ProductoModel');
const suscribirse=require('../models/Suscriptores');
const uploadIMG=require("../storage");
const {enviarMail}=require('../controller/ProductoController');

productoController.enviarMail=(mail,producto,imagen)=>{

    // Definimos el transporter
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASS
        }
    });
// Definimos el email
var mailOptions = {
    from: process.env.EMAIL,
    to: mail,
    subject: "Buena Madera",
    html: `  <h1 style="text-align:center;">Nuevo Producto</h1>
            <h2 style="text-align:center; margin:10px 0">${producto.nombre}</h2>
            <img style="margin:0 auto; " src="cid:imagen" width:100% hight:500px/>
            <p>${producto.descripcion}</p>
            <p>Precio: ${producto.precio}</p>
        `,attachments: [{
            filename: imagen,
            path:`./src/storage/${imagen}`,
            cid: 'imagen' 
       }]
};
// Enviamos el email
transporter.sendMail(mailOptions, function(error, info){
    if (error){
        console.log(error);
        res.send(500, err.message);
    } else {
    }
});
};

productoController.getProducto=async (req,res)=>{
    const pro=await producto.find();
        res.json(pro);
}

productoController.getProductosID=async (req,res)=>{
    const pro=await producto.findById(req.params.id);
        res.json(pro);
};

productoController.createProducto=async (req,res)=>{
        
    const productoNew=new producto({
        imagen_central:req.body.imagen_central,
        // galeria:[],
        nombre:req.body.nombre,
        descripcion:req.body.descripcion,
        categoria:req.body.categoria,
        cantidad:req.body.cantidad,
        precio:req.body.precio,
        descuento:req.body.descuento,
        estado:req.body.estado
    })
    //guardar imagenes
    // if(req.files["imagen_central"][0]){
    //     const {originalname}=req.files["imagen_central"][0];
    //     productoNew.imagen_central="https://buenamadera.herokuapp.com/"+originalname;
    //     var arreglo=[]
    //     for (const iterator of req.files['gallery']) {
    //         arreglo.push("https://buenamadera.herokuapp.com/"+iterator.originalname);
    //     }
    //     productoNew.galeria=arreglo;
    // }
    //enviar mail
    // const sus=await suscribirse.find();
    // for(const item of sus){
    //     const {originalname}=req.files["imagen_central"][0];
    //     enviarMail(item.email,productoNew,originalname);
        
    // }
    const {descuento,precio}=req.body;
    if(descuento>0){
    productoNew.precio=precio-(precio*descuento)/100;
    }

    productoNew.save();
    res.send('se guardo el producto'); 
}

productoController.updateProducto=async (req,res)=>{
    
    const {descuento,precio}=req.body;
    if(descuento>0){
    const precioDescuento=precio-(precio*descuento)/100;
    await producto.updateOne({_id:req.body.id},{$set:{
        nombre:req.body.nombre,descripcion:req.body.descripcion,categoria:req.body.categoria
        ,cantidad:req.body.cantidad,precio:precioDescuento,descuento:req.body.descuento,estado:req.body.estado}
    });
    res.send("se modifico el producto");
}else{
    await producto.updateOne({_id:req.body.id},{$set:{
        nombre:req.body.nombre,descripcion:req.body.descripcion,categoria:req.body.categoria
        ,cantidad:req.body.cantidad,precio:req.body.precio,descuento:req.body.descuento,estado:req.body.estado}
    });
    res.send("se modifico el producto");
}
}

productoController.eliminarProducto=async (req,res)=>{
    await producto.findByIdAndDelete(req.params.id);
    res.send("se elimino el producto");
}

module.exports=productoController;
