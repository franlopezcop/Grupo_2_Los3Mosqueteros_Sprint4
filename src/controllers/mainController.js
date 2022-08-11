const jsonDB = require('../model/jsonDatabase');
const products = jsonDB('products')
const mainController = {
    home: (req,res) =>{
        const allProductos = products.all()
        const saleProducts = allProductos.filter( product => product.discount != 0 );
        res.render("productos/home",
        {
            title:"Home",
            saleProducts
        }
        )
    },

}

module.exports = mainController