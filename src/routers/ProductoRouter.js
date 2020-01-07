const {Router}=require('express');
const router=Router();

const producto=require('../models/ProductoModel');
const suscribirse=require('../models/Suscriptores');
const uploadIMG=require("../libs/storage");
const {enviarMail}=require('../controller/ProductoController');
const jwt=require('jsonwebtoken');

router.post("/nuevo-producto",uploadIMG.fields([{ name: 'imagen_central', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]),async (req,res)=>{
    const token=req.headers['bmtoken3'];
    if(!token){
        res.send("no existe el token")
    }else{
        const verificarToken=await jwt.verify(token,"BMTOKEN");
    if(!verificarToken){
        res.send("el token no es autentico")
    }else{
        const productoNew=new producto({
            imagen_central:"",
            galeria:[],
            nombre:req.body.nombre,
            descripcion:req.body.descripcion,
            categoria:req.body.categoria,
            cantidad:req.body.cantidad,
            precio:req.body.precio,
            descuento:req.body.descuento,
            estado:req.body.estado
        })
        // //guardar imagenes
        // if(req.files["imagen_central"][0]){
        //     const {originalname}=req.files["imagen_central"][0];
        //     productoNew.imagen_central="https://buenamadera.herokuapp.com/"+originalname;
        //     var arreglo=[]
        //     for (const iterator of req.files['gallery']) {
        //         arreglo.push("https://buenamadera.herokuapp.com/"+iterator.originalname);
        //     }
        //     productoNew.galeria=arreglo;
        // }
        // //enviar mail
        // const sus=await suscribirse.find();
        // for(const item of sus){
        //     const {originalname}=req.files["imagen_central"][0];
        //     enviarMail(item.email,productoNew,originalname);
            
        // }
        productoNew.save();
        res.send('se guardo el producto'); 
        }
    }
});

//get productos por ID
router.get("/productos/:id",async (req,res)=>{
    const pro=await producto.findById(req.params.id);
        res.json(pro);
});

router.get("/productos",async (req,res)=>{
    const pro=await producto.find();
        res.json(pro);
});
router.post("/modificar-producto",async (req,res)=>{
    const token=req.headers['bmtoken3'];
    if(!token){
        res.send("no existe el token")
    }else{
        const verificarToken=await jwt.verify(token,"BMTOKEN");
    if(!verificarToken){
        res.send("el token no es autentico")
    }else{
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
    }
    
});
router.post("/eliminar-producto/:id",async (req,res)=>{
    const token=req.headers['bmtoken3'];
    if(!token){
        res.send("no existe el token")
    }else{
        const verificarToken=await jwt.verify(token,"BMTOKEN");
    if(!verificarToken){
        res.send("el token no es autentico")
    }else{
        await producto.findByIdAndDelete(req.params.id);
        res.send("se elimino el producto");
    }
    }
    
});

module.exports=router;
