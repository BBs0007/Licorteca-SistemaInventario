const {matchedData} = require("express-validator");
const {tokenSign} = require("../utils/handlejwt");
const { encrypt, compare } = require("../utils/handlePassword");
const {usersModel} = require("../models");
const { handleHttpError } = require("../utils/handleError");



/**
 * Este controlador es el encargado de registrar un usuario
 * @param {*} req 
 * @param {*} res 
 */
const registerCtrl = async (req, res) =>{

  try {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = {...req, password};
    console.log(body)
    const dataUser = await usersModel.create(body);
    dataUser.set("password", undefined, {strict:false});//aqui no muestra el password para no mostrar el hash

    const data = {
        token: await tokenSign(dataUser),
        user:dataUser

    }
    
    res.send({data});

  } catch (e) {
      console.log(e);
    handleHttpError(res, "error al registrar user")
  }
};


const loginCtrl = async (req, res) =>{

    try {
        req = matchedData(req);
        const user = await usersModel.findOne({email:req.email})
        if(!user){
            handleHttpError(res, "user no existe", 404);
            return
        }

        console.log(user)

        const hashPassword = user.get('password');
       
        const check = await compare(req.password, hashPassword)

        
        
        if(!check){
            handleHttpError(res, "password invalida", 401);
            return
        }

        user.set('password', undefined, {strict:false});

        const data = {
            token: await tokenSign(user),
            user
        }
        

        res.send({data});



    } catch (e) {
       console.log(e)
        handleHttpError(res,"Error al iniciar seccion", 403);
    }

};

module.exports = {registerCtrl, loginCtrl};