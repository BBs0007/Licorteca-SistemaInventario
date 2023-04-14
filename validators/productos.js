const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");



const validatorCreateItem = [
    check("name")
    .exists()
    .notEmpty(),
    check("categoria")
    .exists()
    .notEmpty(),
    check("stock_actual")
    .exists()
    .notEmpty(),
    check("stock_min")
    .exists()
    .notEmpty(),
    check("stock_max")
    .exists()
    .notEmpty(),
    (req, res, next) => validateResults (req, res, next)
    

];

const validatorGetItem = [
    
    check("id")
    .exists()
    .notEmpty(),
    (req, res, next) => validateResults (req, res, next)
    

];

const validatorActualizarItem = [
    
    check("id")
    .exists()
    .notEmpty(),
    check("name")
    .exists()
    .notEmpty(),
    check("categoria")
    .exists()
    .notEmpty(),
    check("stock_actual")
    .exists()
    .notEmpty(),
    check("stock_min")
    .exists()
    .notEmpty(),
    check("stock_max")
    .exists()
    .notEmpty(),
    (req, res, next) => validateResults (req, res, next)
    

];

module.exports = { validatorCreateItem, validatorGetItem, validatorActualizarItem };