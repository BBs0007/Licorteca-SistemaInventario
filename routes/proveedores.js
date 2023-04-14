const express = require("express");
const { getProveedores, getProveedor, createProveedor, updateProveedor, deleteProveedor } = require("../controllers/proveedores");

const router = express.Router();
//const { validatorCreateItem, validatorGetItem, validatorActualizarItem } = require("../validators/productos")

//TODO http://localhost/productos GET, POST, DELETE, PUT

router.get("/", getProveedores);
router.get("/:id", getProveedor);
router.post("/", createProveedor);
router.put("/:id", updateProveedor);
router.delete("/:id", deleteProveedor);


module.exports = router;