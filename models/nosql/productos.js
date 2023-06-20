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
        description: {
            type: String,
            required: true
        },
        url_img: {
            type: String,
        },
        stock_min: { 
            type: Number, 
            
        },
        stock_max: { 
            type: Number, 
             
        },
        stock_actual: { 
            type: Number, 
            required: true 
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