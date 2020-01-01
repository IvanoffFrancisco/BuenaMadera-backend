const {Router}=require('express');
const router=Router();

const producto=require('../models/ProductoModel');
const uploadIMG=require("../libs/storage");

router.post("/nuevo-producto",uploadIMG.fields([{ name: 'imagen_central', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]),async (req,res)=>{
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
    if(req.files["imagen_central"][0]){
        const {originalname}=req.files["imagen_central"][0];
        productoNew.imagen_central="http://localhost:4000/"+originalname;
        var arreglo=[]
        for (const iterator of req.files['gallery']) {
            arreglo.push("http://localhost:4000/"+iterator.originalname);
        }
        productoNew.galeria=arreglo;
    }
    productoNew.save();
   res.send('se guardo el producto');
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
    await producto.updateOne({_id:req.body.id},{$set:{
        nombre:req.body.nombre,descripcion:req.body.descripcion,categoria:req.body.categoria
        ,cantidad:req.body.cantidad,precio:req.body.precio}
    });
    res.send("se modifico el producto");
});

router.post("/eliminar-producto/:id",async (req,res)=>{
    await producto.findByIdAndDelete(req.params.id);
    res.send("se elimino el producto");
});

module.exports=router;
