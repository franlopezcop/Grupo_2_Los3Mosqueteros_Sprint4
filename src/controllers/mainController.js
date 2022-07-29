const jsonDB = require('../model/jsonDatabase');
const products = jsonDB('products')
const allProductos = products.all()
const mainController = {
    home: (req,res) =>{
        const saleProducts = allProductos.filter( product => product.discount != 0 );
        res.render("productos/home",
        {
            saleProducts
        }
        )
    },

}

module.exports = mainController