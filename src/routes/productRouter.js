const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController")

router.get("/productos", productController.listadoProductos)

router.get("/productCart", productController.carrito)

router.get("/detalle/:id", productController.detalle)

router.get("/create", productController.crear)

router.get("/edit/:id", productController.editar)

module.exports = router