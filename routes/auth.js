const express = require("express");
const {registerCtrl, loginCtrl} = require("../controllers/auth");
const { validatorLogin, validatorRegister } = require("../validators/auth");

const router = express.Router();




/**
 * Crear un registro
 */
//http://localhost:3001/api/auth/login
//http://localhost:3001/api/auth/register
router.post("/register", validatorRegister, registerCtrl);

router.post("/login", validatorLogin, loginCtrl);


module.exports = router