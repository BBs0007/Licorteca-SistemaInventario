const mongoose = require("mongoose");
//const { proveedoresModel, catalogosModel } = require("../models");
//const catalogos = mongoose.model('Catalogos');

//const proveedores = mongoose.model('proveedores');
//const mongooseDelete = require("mongoose-delete");

const ProductoScheme = new mongoose.Schema(
    {
        name :{
            type: String,
        },
        price: {
            type: Number,
            required: true
        },
        stock_min: { 
            type: Number, 
            required: true 
        },
        stock_max: { 
            type: Number, 
            required: true 
        },
        stock_actual: { 
            type: Number, 
            required: true 
        },
        catalog_id: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Catalogos'
        },
        proveedor_id: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'proveedores'
        }


    },
    {
        timestamps: true, //TODO createdAt, updatedAt
        versionKey: false
    }
);

//TracksScheme.plugin(mongooseDelete, { overrideMethods: "all"});
module.exports = mongoose.model("productos", ProductoScheme)