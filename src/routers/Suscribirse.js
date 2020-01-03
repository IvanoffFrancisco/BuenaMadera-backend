const {Router}=require('express');
const router=Router();

const suscribirse=require('../models/Suscriptores');



router.get("/suscripciones",async (req,res)=>{
    const sus=await suscribirse.find();
    res.json(sus);
});

router.post("/suscribirse",async (req,res)=>{
    const email=await suscribirse.findOne({email:req.body.email});
        if(email){
            
            res.send(email+" ya se encuentra registrado este email");
        }else{
            const suscri=new suscribirse({
                email:req.body.email
            });
            suscri.save();
            res.send("Email registrado");
        }
})

module.exports=router;