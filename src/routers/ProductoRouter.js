const {Router}=require('express');
const router=Router();
const {getProducto,getProductosID,eliminarProducto,createProducto,updateProducto}=require('../controller/ProductoController');
const Auth=require('../middlewares/Auth');

router.post("/nuevo-producto",Auth,uploadIMG.fields([{ name: 'imagen_central', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]),createProducto);

//get productos por ID
router.get("/productos/:id",getProductosID);

router.get("/productos",getProducto);

router.post("/modificar-producto",Auth,updateProducto);

router.post("/eliminar-producto/:id",Auth,eliminarProducto);

module.exports=router;
