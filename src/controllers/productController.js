const products = require("../database/products")

const productController = {
    listadoProductos: (req,res) =>{
        res.render("productos/home",
        {
            products
        }
        )
    },
    carrito:(req,res) =>{
        res.render("productos/productCart",
        {
            products
        }
        )
    },

    detalle: (req,res) =>{
        const id = Number(req.params.id)
        const product = products.find(product => product.id === id)
        res.render("productos/productDetail",
        {
            product,
            products
        }
        )
    },

    /*Formulario de creación de producto:*/

    crear: (req,res) =>{
        res.render("productos/addProduct",
        {
            products
        }
        )
    },

    editar: (req,res) =>{
        res.render("productos/editProduct",
        {
            products
        }
        )
    },


}

module.exports = productController