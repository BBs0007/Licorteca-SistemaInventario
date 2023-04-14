const mongoose = require("mongoose");
//const mongooseDelete = require("mongoose-delete");

const CatalogoScheme = new mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        proveedor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'proveedores' }

    },
    {
        timestamps: true, //TODO createdAt, updatedAt
        versionKey: false
    }
);

//TracksScheme.plugin(mongooseDelete, { overrideMethods: "all"});
module.exports = mongoose.model("Catalogos", CatalogoScheme);