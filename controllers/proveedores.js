const { productosModel, proveedoresModel } = require("../models");
const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");



/** Mostrar todos los items
 * @param {*} req 
 * @param {*} res
 * */
const getProveedores = async (req,res) => {

    try {
        const user = req.user;
        const data = await proveedoresModel.find({});
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
const getProveedor = async (req,res) => {
    try {
        req = matchedData(req);
        const {id} = req;
        const data = await proveedoresModel.findById(id);
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
const createProveedor = async (req,res) => {

    


    // try {

    //     const body = matchedData(req);
    //     const data = await proveedoresModel.create(body);
    //     res.send({data});

    // } catch (e) {
    //     console.log(e)
    //     handleHttpError(res, "error al crear proveedor");
    // }

    const newProveedor = new proveedoresModel({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone
      });
      try {
        const savedProveedor = await newProveedor.save();
        res.json(savedProveedor);
      } catch (error) {
        res.status(500).send('Error al agregar el proveedor');
      }


    
};

/** Actualizar o modificar un registro
 * @param {*} req 
 * @param {*} res
 * */
const updateProveedor = async (req,res) => {

    try {

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


        const product = await productosModel.findById(req.params.id);
        if (product) {
            product.stock_actual = req.body.stock_actual;
            if (product.stock_actual <= product.stock_min) {
                console.log(`¡Alerta! El producto ${product.name} está en su stock mínimo (${product.stock_min}).`);
                const quantityToPurchase = product.stock_max - product.stock_actual;
                const newPurchase = new purchasesModel({
                    product_id: product._id,
                    quantity: quantityToPurchase
                });
            product.stock_actual = product.stock_max;
            await product.save();
            await newPurchase.save();
            }
        if (product.stock_actual < 0) {
        product.stock_actual = 0;
        }
      const updatedProduct = await product.save();
      res.json(updatedProduct);

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
const deleteProveedor = async (req,res) => {
    try {
        req = matchedData(req);
        const {id} = req;
        const data = await proveedoresModel.findByIdAndDelete({_id:id});
        res.send({data});  
    } catch (e) {
        handleHttpError(res, "ERror_delete_ITEM")
    }

};

module.exports = {getProveedores, getProveedor, createProveedor, updateProveedor, deleteProveedor}