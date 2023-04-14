const express = require("express");
const { getCatalogos, getCatalogo, createCatalogo, updateCatalogo, deleteCatalogo } = require("../controllers/catalogos");

const router = express.Router();
//const { validatorCreateItem, validatorGetItem, validatorActualizarItem } = require("../validators/productos")

//TODO http://localhost/productos GET, POST, DELETE, PUT

router.get("/", getCatalogos);
router.get("/:id", getCatalogo);
router.post("/", createCatalogo);
router.put("/:id", updateCatalogo);
router.delete("/:id", deleteCatalogo);


module.exports = router;