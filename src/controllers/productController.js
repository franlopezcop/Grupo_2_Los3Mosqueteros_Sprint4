const jsonDB = require('../model/jsonDatabase'); 
const products = jsonDB('products') // funcionalides de json database
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const path = require('path');
const fs = require('fs');
const productController = {

    listadoProductos: (req,res) =>{
        const allProducts = products.all() // productos todo lo que labura con el array de productos va con allproducts
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
			image: req.files.length >= 1  ? images : ["default-image.svg"]

		}
		products.create(newProduct)
		console.log('cree un nuevo producto')
		res.redirect('/products')
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
        // Desestructuramos el id del req.params
        const { id } = req.params;

        // Desestructuramos la propiedad image del producto encontrado y lo renombramos
        const { image: imagenesBorrar} = products.find(id);
        // Procedemos a iterar el array de imagenes con un forEach y borrarlas del FS
        imagenesBorrar.forEach( file => {
            const filePath = path.join(__dirname, `../../public/images/${file}`);
            fs.unlinkSync(filePath);
        });

        // Borramos el producto del archivo JSON
        products.delete(id);
        
        // Redirigimos al Home
        res.redirect("/");
    }


}

module.exports = productController