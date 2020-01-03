var nodemailer = require('nodemailer');
const productoController={};

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
            path:`./src/storage/imgs/${imagen}`,
            cid: 'imagen' 
       }]
};
// Enviamos el email
transporter.sendMail(mailOptions, function(error, info){
    if (error){
        console.log(error);
        res.send(500, err.message);
    } else {
        console.log("Email sent");
        res.status(200).jsonp(req.body);
    }
});
};


module.exports=productoController;
