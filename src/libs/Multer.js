const multer=require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './src/storage/imgs')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname + '-' + Date.now())
    }
  })
   
  var upload = multer({ storage: storage })

  module.exports=upload;