const { validationResult } = require("express-validator")

const validateResults = (req, res, next) => {
    try{
        validationResult(req).throw();
        return next(); //la linea anterior valida que no vea error y en esta retorna que esta bien, si hay error pasa a las lineas de abajo
    }catch (err) {
        res.status(403);
        res.send({ errors: err.array() });
    }
};

module.exports = validateResults