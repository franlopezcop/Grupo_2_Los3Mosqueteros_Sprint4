const multer = require('multer');
const path = require('path')


const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,'../../public/images')); // indica como armar la carpeta destino
    },
    filename : function(req,file,cb){
        cb(null, `imgProduct_${Date.now()}${path.extname(file.originalname)}`)
    }
});
const upload = multer({storage});
// se le pasa como parametro dicha configuracion


module.exports = upload;