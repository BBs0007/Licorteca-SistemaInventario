const jwt = require("jsonwebtoken");
//const getProperties = require("../utils/handlePropertiesEngine");
const JWT_SECRET = process.env.JWT_SECRET;
//const propertiesKey = getProperties();


/**
 * Debes de pasar el objecto del usuario
 * @param {*} user
 */
const tokenSign = async (user) => {
    const sign = jwt.sign(
        {
            //[propertiesKey.id]: user[propertiesKey.id],
            _id: user._id,
            role: user.role,
        },
        JWT_SECRET,
        {
            expiresIn: "2h",
        }
    );
    return sign
};


/**
 * debes de pasar el token de session el JWT
 * @param {*} tokenJwt 
 * @returns
 */

const verifyToken = async (tokenJwt) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET)
        
    } catch (e) {
        return null
    }
}

module.exports = { tokenSign, verifyToken};