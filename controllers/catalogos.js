const { productosModel, proveedoresModel, catalogosModel } = require("../models");
const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleError");



/** Mostrar todos los items
 * @param {*} req 
 * @param {*} res
 * */
const getCatalogos = async (req,res) => {

    try {
        // const user = req.user;
        // const data = await catalogosModel.find({});
        // console.log(data)
        // res.send({data, user});  
        
        const producto = await productosModel.find({})
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
const getCatalogo = async (req,res) => {
    try {
        // req = matchedData(req);
        // const {id} = req;
        // const data = await catalogosModel.findById(id);
        // res.send({data}); 
        
        const producto = await productosModel.findById(req.params.id)
          .populate('proveedor_id');
        res.json(producto);

    } catch (e) {
        console.log(e)
        handleHttpError(res, "ERror_get_ITEM")
    }

};

/** Crear un item
 * @param {*} req 
 * @param {*} res
 * */
const createCatalogo = async (req,res) => {

    


    // try {

    //     const body = matchedData(req);
    //     const data = await productosModel.create(body);
    //     res.send({data})

    // } catch (e) {
    //     console.log(e)
    //     handleHttpError(res, "error al crear item");
    // }

    const newCatalogo = new catalogosModel({
        name: req.body.name,
        description: req.body.description,
        proveedor_id: req.body.proveedor_id
      });
      try {
        const savedCatalogo = await newCatalogo.save();
        res.json(savedCatalogo);

    } catch (e) {
        console.log(e)
        handleHttpError(res, "error al crear item");
    }
    
};

/** Actualizar o modificar un registro
 * @param {*} req 
 * @param {*} res
 * */
const updateCatalogo = async (req,res) => {

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
const deleteCatalogo = async (req,res) => {
    try {
        req = matchedData(req);
        const {id} = req;
        const data = await productosModel.findByIdAndDelete({_id:id});
        res.send({data});  
    } catch (e) {
        handleHttpError(res, "ERror_delete_ITEM")
    }

};

module.exports = {getCatalogos, getCatalogo, createCatalogo, updateCatalogo, deleteCatalogo}