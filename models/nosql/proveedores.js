const mongoose = require("mongoose");
//const mongooseDelete = require("mongoose-delete");

const ProveedorScheme = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true }

    },
    {
        timestamps: true, //TODO createdAt, updatedAt
        versionKey: false
    }
);

//TracksScheme.plugin(mongooseDelete, { overrideMethods: "all"});
module.exports = mongoose.model("proveedores", ProveedorScheme);