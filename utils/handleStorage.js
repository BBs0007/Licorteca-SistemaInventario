const multer = require("multer");

const storage = multer.diskStorage({
    destination:function(req, file, cb){
        const pathStorage = `${__dirname}/../storage`;
        cb(null, pathStorage)
    },
    filename: function (req, file, cb) {
        // documentos que pueden entrar mi-cv.pdf mi-foto.png

        const ext = file.originalname.split(".").pop();
        const filename = `file-${Date.now()}.${ext}` //esto seria que le cambiamos el nombre al documento para que no vea nombre iguales y se veria asi = file-12341231.mp3
        cb(null, filename)
    },
});

const uploadMiddleware = multer({storage});


module.exports = uploadMiddleware;