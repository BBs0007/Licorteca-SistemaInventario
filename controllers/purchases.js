const { purchasesModel, productosModel } = require("../models");
const { matchedData, body } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");



/** Mostrar todos los items
 * @param {*} req 
 * @param {*} res
 * */
const getPurchases = async (req,res) => {

    try {
        const user = req.user;
        const data = await purchasesModel.find({});
        console.log(data)
        res.send({data, user});   
    } catch (e) {
        console.log(e)
        handleHttpError(res, "error_get_items");   
    }
};

/** Mostrar solo un item especifico
 * @param {*} req 
 * @param {*} res
 * */
const getPurchase = async (req,res) => {
    try {
        req = matchedData(req);
        const {id} = req;
        const data = await purchasesModel.findById(id);
        res.send({data});  
    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERror_get_ITEM")
    }

};

/** Crear un item
 * @param {*} req 
 * @param {*} res
 * */
const createPurchase = async (req,res) => {

    const newPurchase = new purchasesModel({
        product_id: req.body.product_id,
        quantity: req.body.quantity
      });
      try {
        const savedPurchase = await newPurchase.save();
        const product = await productosModel.findById(savedPurchase.product_id);
        if (product) {
          product.stock_actual += savedPurchase.quantity;
          await product.save();
        }
        
        res.json(savedPurchase);
       
    
    

    } catch (e) {
        console.log(e)
        handleHttpError(res, "error al crear compra");
    }


    
};

/** Actualizar o modificar un registro
 * @param {*} req 
 * @param {*} res
 * */
const updatePurchase = async (req,res) => {

    try {

        const {id, ...body} = matchedData(req);
        // const data = await productosModel.findByIdAndUpdate(
        //     id, body
        // );
        //res.send({ data})
        const product = await productosModel.findById(req.params.id);
        if (product) {
          product.stock_actual = req.body.stock_actual;
          if (product.stock_actual <= product.stock_min) {
            handleHttpError(res,`¡Alerta! El producto ${product.name} está en su stock mínimo (${product.stock_min}).`);
          }

          if (product.stock_actual < 0) {
            product.stock_actual = 0;
          }

        //const {id, ...body} = matchedData(req);
        const data = await productosModel.findByIdAndUpdate(
            id, body
        );
        res.send({ data})

        } else {
            handleHttpError(res,'Producto no encontrado');
        }

    } catch (e) {
        handleHttpError(res, "error al actualizar item");
    }

};



/** Eliminar un registro
 * @param {*} req 
 * @param {*} res
 * */
const deletePurchase = async (req,res) => {
    try {
        req = matchedData(req);
        const {id} = req;
        const data = await salesModel.findByIdAndDelete({_id:id});
        res.send({data});  
    } catch (e) {
        handleHttpError(res, "ERror_delete_ITEM")
    }

};

module.exports = {getPurchases, getPurchase, createPurchase, updatePurchase, deletePurchase}