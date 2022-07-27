const products = require("../database/products")

const mainController = {
    home: (req,res) =>{
        const saleProducts = products.filter( product => product.Descuento != 0 );
        res.render("productos/home",
        {
            saleProducts
        }
        )
    },

}

module.exports = mainController