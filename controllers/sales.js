const { salesModel, productosModel } = require("../models");
const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");



/** Mostrar todos los items
 * @param {*} req 
 * @param {*} res
 * */
const getSales = async (req,res) => {

    try {
        const user = req.user;
        const data = await salesModel.find({});
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
const getSale = async (req,res) => {
    try {
        req = matchedData(req);
        const {id} = req;
        const data = await salesModel.findById(id);
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
const createSale = async (req,res,next) => {

    const newSale = new salesModel({
        product_id: req.body.product_id,
        quantity: req.body.quantity
      });


    try {

    
       
        const savedSale = await newSale.save();
        const product = await productosModel.findById(savedSale.product_id);
        if (product) {
          
          let comprobar = product.stock_actual;
          
          comprobar -= savedSale.quantity;
         
          if(comprobar < 0){
            product.stock_actual = 0;
            console.log(`¡Alerta! El producto ${product.name} se acabo, se deben hacer pedido`);
            res.status(400).send('El producto ingresado se acabo, se debe hacer perdido');
            return;
          }

          if (comprobar <= product.stock_min) {
            console.log(`¡Alerta! El producto ${product.name} está por debajo de su stock mínimo que es de (${product.stock_min}) unidades y tiene de stock actual es de (${comprobar}) unidades.`);
            res.status(400).send('El producto esta por debajo de su minimo, se debe hacer el pedido');
            product.stock_actual -= savedSale.quantity;
            await product.save();
           
            return;
          };

        
            product.stock_actual -= savedSale.quantity;
            await product.save();
          
          
        }
        res.json(savedSale);
    
    

    } catch (e) {
        console.log(e)
        handleHttpError(res, "error al crear venta");
    }


    
};

/** Actualizar o modificar un registro
 * @param {*} req 
 * @param {*} res
 * */
const updateSale = async (req,res) => {

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
const deleteSale = async (req,res) => {
    try {
        req = matchedData(req);
        const {id} = req;
        const data = await salesModel.findByIdAndDelete({_id:id});
        res.send({data});  
    } catch (e) {
        handleHttpError(res, "ERror_delete_ITEM")
    }

};

module.exports = {getSales, getSale, createSale, updateSale, deleteSale}