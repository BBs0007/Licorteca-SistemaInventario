const express = require("express");
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/productos");

const router = express.Router();
//const { validatorCreateItem, validatorGetItem, validatorActualizarItem } = require("../validators/productos")

//TODO http://localhost/productos GET, POST, DELETE, PUT

router.get("/", getItems);
router.get("/:id", getItem);
router.post("/", createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);


module.exports = router;