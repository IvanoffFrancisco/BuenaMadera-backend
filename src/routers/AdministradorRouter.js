const {Router}=require('express');
const router=Router();

const admin=require('../models/Administrador');
const jwt=require('jsonwebtoken');

router.post("/registro",async(req,res)=>{
    const ad=new admin({
        email:req.body.email,
        usuario:req.body.usuario,
        password:req.body.password
    });
    
    ad.password=await ad.HashPassword(ad.password); 
    
    await ad.save()
    res.send("nuevo usuario creado")
})

router.post("/login",async(req,res)=>{
        const ad=await admin.findOne({email:req.body.email});
            if(!ad){
                res.json({"error":"email y/o contraseñas incorrectas"})   
            }else{
                const add=await ad.ValidarPassword(req.body.password);
                if(!add){
                    res.json({"error":"email y/o contraseñas incorrectas"})  
                }else{
                    const token=await jwt.sign({id:ad._id},"BMTOKEN");
                    res.json({BMT:token})
                }
                
            }  
})

module.exports=router;