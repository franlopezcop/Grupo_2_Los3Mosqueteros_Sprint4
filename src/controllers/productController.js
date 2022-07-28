const jsonDB = require('../model/jsonDatabase'); 
const products = jsonDB('products') // funcionalides?
const allProducts = products.all() // productos? todo lo que labura con el array de productos va con allproducts
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

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

    // va aca el carrito??? no lo vi en el controller de mercadomulter
    carrito:(req,res) =>{
        res.render("productos/productCart",
        {
            products,
            
        }
        )
    },

    // Detail

    detail: (req,res) =>{
        const product = products.find(req.params.id);
        /*const product = products.find(product => product.id === id)*/
        res.render("productos/productDetail",
        {
            product,
            toThousand

        }
        )
    },

   // Create - Form to create

    create: (req,res) =>{
        res.render("productos/addProduct")
    },

    // Create -  Method to store
    store: (req, res) => {
		let images= []
        for(let i = 0 ; i<req.files.length;i++){
            images.push(req.files[i].filename) //tomo solamente el nombre, por eso filename
        }

		console.log(req.files);


		const newProduct = {
			...req.body,
			image: req.files.length >= 1  ? images : ["default-image.png"] // falta agregar img x default

		}
		products.create(newProduct)
		console.log('cree un nuevo producto')
		res.redirect('/')
	},

    // Update - Form to edit

    edit: (req,res) =>{
        let productToEdit = products.find(req.params.id)
        res.render("productos/editProduct",
        {
            productToEdit
        }
        )
    },

    // Update - Method to update

    update: (req, res) => {
		let productToEdit = products.find(req.params.id)

		productToEdit = {

			id: productToEdit.id,
			...req.body,
		//	image: productToEdit.image,

		}

		products.update(productToEdit)
		res.redirect("/");

	},

    // Update - Method to delete

    destroy: function(req,res){
        products.delete(req.params.id);
        res.redirect("/");
    }


}

module.exports = productController