
const jsonDB = require('../model/jsonDatabase');
const products = jsonDB('products')
const allProducts = products.all()
const productController = {
    listadoProductos: (req,res) =>{
        const table = allProducts.filter( product => product.category == "table" );
        const coffeeTable = allProducts.filter( product => product.category == "coffeeTable" );
        const desk = allProducts.filter( product => product.category == "desk" );
        const mirror = allProducts.filter( product => product.category == "mirror" );
        res.render("productos/products",
        {
            table,
            coffeeTable,
            desk,
            mirror
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
        const product = products.find(req.params.id);
        /*const product = products.find(product => product.id === id)*/
        res.render("productos/productDetail",
        {
            product,

        }
        )
    },

    /*Formulario de creación de producto:*/

    crear: (req,res) =>{
        res.render("productos/addProduct",
       /* {
            products
        }*/
        )
    },

    editar: (req,res) =>{
        let productToEdit = products.find(req.params.id)
        res.render("productos/editProduct",
        {
            productToEdit
        }
        )
    },


}

module.exports = productController