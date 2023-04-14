const bcryptjs = require("bcryptjs");



/**
 * Aqui esta entrando la contrasena sin incriptar
 * @param {*} passwordPlain 
 */
const encrypt = async (passwordPlain) => {
    const hash = await bcryptjs.hash(passwordPlain, 10)
    // ahora la contrasena esta incrptada ej:"ajfhaskdljfhas123423154"
    return hash;
}

/**
 * Pasar contrasena sin encriptar y pasar password encrptada
 * @param {*} passwordPlain 
 * @param {*} hashPassword 
 */
const compare = async (passwordPlain, hashPassword) => {
    return await bcryptjs.compare(passwordPlain, hashPassword)
}


module.exports = {encrypt, compare};