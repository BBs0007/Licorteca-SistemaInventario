const { productosModel, purchasesModel, catalogosModel } = require("../models");
const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");



/** Mostrar todos los items
 * @param {*} req 
 * @param {*} res
 * */
const getItems = async (req,res) => {

    try {
        // const user = req.user;
        // const data = await productosModel.find({});
        // console.log(data)
        // res.send({data, user});   

        const producto = await productosModel.find({})
          //.populate('catalog_id')
          .populate('proveedor_id');
        res.json(producto);

    } catch (e) {
        console.log(e)
        handleHttpError(res, "error_get_items");   
    }
};

/** Mostrar solo un item especifico
 * @param {*} req 
 * @param {*} res
 * */
const getItem = async (req,res) => {
    // try {
    //     req = matchedData(req);
    //     const {id} = req;
    //     const data = await productosModel.findById(id);
    //     res.send({data});  
    // } catch (e) {
    //     console.log(e)
    //     handleHttpError(res, "ERror_get_ITEM")
    // }

    try {
        const producto = await productosModel.findById(req.params.id)
          //.populate('catalog_id')
          .populate('proveedor_id');
        res.json(producto);
      } catch (error) {
        res.status(500).send('Error al obtener el producto');
      }

};

/** Crear un item
 * @param {*} req 
 * @param {*} res
 * */
const createItem = async (req,res) => {

    


    // try {

    //     const body = matchedData(req);
    //     const data = await productosModel.create(body);
    //     res.send({data})

    // } catch (e) {
    //     console.log(e)
    //     handleHttpError(res, "error al crear item");
    // }

    const newProducto = new productosModel(req.body);
      try {
        const savedProducto = await newProducto.save();
        res.json(savedProducto);

    } catch (e) {
        handleHttpError(res, "error al actualizar item");
    }


    
};

/** Actualizar o modificar un registro
 * @param {*} req 
 * @param {*} res
 * */
const updateItem = async (req,res) => {

    

        // const {id, ...body} = matchedData(req);
        // // const data = await productosModel.findByIdAndUpdate(
        // //     id, body
        // // );
        // //res.send({ data})
        // const product = await productosModel.findById(req.params.id);
        // if (product) {
        //   product.stock_actual = req.body.stock_actual;
        //   if (product.stock_actual <= product.stock_min) {
        //     handleHttpError(res,`¡Alerta! El producto ${product.name} está en su stock mínimo (${product.stock_min}).`);
        //   }

        //   if (product.stock_actual < 0) {
        //     product.stock_actual = 0;
        //   }

        // //const {id, ...body} = matchedData(req);
        // const data = await productosModel.findByIdAndUpdate(
        //     id, body
        // );
        // res.send({ data})


    //     const product = await productosModel.findById(req.params.id);
    //     if (product) {
    //         product.stock_actual = req.body.stock_actual;
    //         if (product.stock_actual <= product.stock_min) {
    //             console.log(`¡Alerta! El producto ${product.name} está en su stock mínimo (${product.stock_min}).`);
    //             const quantityToPurchase = product.stock_max - product.stock_actual;
    //             const newPurchase = new purchasesModel({
    //                 product_id: product._id,
    //                 quantity: quantityToPurchase
    //             });
    //         product.stock_actual = product.stock_max;
    //         await product.save();
    //         await newPurchase.save();
    //         }
    //     if (product.stock_actual < 0) {
    //     product.stock_actual = 0;
    //     }
    //   const updatedProduct = await product.save();
    //   res.json(updatedProduct);

    //     } else {
    //         handleHttpError(res,'Producto no encontrado');
    //     }


    try {
        const producto = await productosModel.findById(req.params.id)
          .populate('catalog_id')
          .populate('proveedor_id');
        res.json(producto);
      } catch (error) {
        res.status(500).send('Error al obtener el producto');
      }

    
  }




/** Eliminar un registro
 * @param {*} req 
 * @param {*} res
 * */
const deleteItem = async (req,res) => {
    try {
        req = matchedData(req);
        const {id} = req;
        const data = await productosModel.findByIdAndDelete({_id:id});
        res.send({data});  
    } catch (e) {
        handleHttpError(res, "ERror_delete_ITEM")
    }

};

module.exports = {getItems, getItem, createItem, updateItem, deleteItem}