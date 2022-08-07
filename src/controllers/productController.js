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
            title: "Productos",
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
            title: "Carrito",
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
            title: "Detalle",
            product,
            toThousand

        }
        )
    },

   // Create - Form to create

    create: (req,res) =>{
        res.render("productos/addProduct", {title: "Crear producto"},)
    },

    // Create -  Method to store
    store: (req, res) => {
		let images= []
        let files = req.files
        files.forEach(image => {
			images.push(image.filename)
		});

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
            title: "Editar producto",
            productToEdit
        }
        )
    },

    // Update - Method to update

    update: (req, res) => {
		let id = Number(req.params.id);
		let productToEdit = products.find(id);
		let images = [];
		let files = req.files
		
		// cambiamos ciclo for por forEach
		files.forEach(image => {
			images.push(image.filename)
		});

		productToEdit = {
			id: productToEdit.id,
			...req.body,
			// Si se suben imagenes se pone como valor el array imagenes y sino se queda el que ya estaba antes
			image: files.length >= 1  ? images : productToEdit.image
		}

		products.update(productToEdit)
		res.redirect("/");
	},


    // Update - Method to delete

    destroy: function(req,res){
        let id = Number(req.params.id);
        products.delete(id);
        res.redirect("/");
    }

}

module.exports = productController