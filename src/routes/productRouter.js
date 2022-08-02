const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController")

const upload = require('../middleware/middlemulter')

router.get("/", productController.listadoProductos)

router.get("/create", productController.create)

router.post('/', upload.array("image"), productController.store);

router.get("/detalle/:id", productController.detail)

router.get("/productCart", productController.carrito)

router.get("/edit/:id", productController.edit)

router.put('/edit/:id', upload.array("image"), productController.update); 

router.delete('/delete/:id', productController.destroy); 


module.exports = router