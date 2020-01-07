const {Router}=require('express');
const router=Router();

const admin=require('../models/Administrador');
const jwt=require('jsonwebtoken');

router.post("/login",async(req,res)=>{
    const nuevoAdmin=await admin.find().countDocuments();
    if(nuevoAdmin==1){
        const ad=await admin.findOne({email:req.body.email});
            if(!ad){
                res.send("email y/o contraseñas incorrectas")   
            }else{
                const add=await ad.ValidarPassword(req.body.password);
                if(!add){
                    res.send("email y/o contraseñas incorrectas")
                    
                }else{
                    const token=await jwt.sign({id:ad._id},"BMTOKEN");
                    res.json({BMT:token})
                }
                
            }

    }else{
        const ad=new admin({
            email:"admin@gmail.com",
            usuario:"buenaMadera",
            password:"BMF123"
        });
        
        ad.password=await ad.HashPassword(ad.password); 
        
        await ad.save()
        res.send("nuevo usuario creado")
    }
})

module.exports=router;