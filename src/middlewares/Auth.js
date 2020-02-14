const jwt=require('jsonwebtoken');

async function Auth(req,res,next) {
    const token=req.headers['bmtoken3'];
    if(!token){
        res.send("no existe el token")
    }else{
        const verificarToken=await jwt.verify(token,"BMTOKEN");
    if(!verificarToken){
        res.send("el token no es autentico")
    }else{
        next();
    }
}
}


module.exports=Auth;