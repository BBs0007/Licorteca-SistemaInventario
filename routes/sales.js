const express = require("express");
const { getSales, getSale, createSale, updateSale, deleteSale } = require("../controllers/sales");

const router = express.Router();
//const { validatorCreateItem, validatorGetItem, validatorActualizarItem } = require("../validators/productos")

//TODO http://localhost/productos GET, POST, DELETE, PUT

router.get("/", getSales);
router.get("/:id", getSale);
router.post("/", createSale);
router.put("/:id", updateSale);
router.delete("/:id", deleteSale);


module.exports = router;