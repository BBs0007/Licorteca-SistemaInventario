const express = require("express");
const uploadMiddleware = require("../utils/handleStorage")
const { createItem, getItems, getItem, deleteItem } = require("../controllers/storage");
const { validatorGetItem } = require("../validators/storage");
const router = express.Router();



//http:localhost:3001/api/storage



/**
 * obtener lista detalles
 */
router.get("/", getItems);

/**
 * obtener detalle de un registro
 */
router.get("/:id", validatorGetItem ,getItem );

/**
 * Eliminar un registro
 */
router.delete("/:id", validatorGetItem ,deleteItem);



/**
 * crear un registro
 */
router.post("/", uploadMiddleware.single("myfile") , createItem);



module.exports = router;