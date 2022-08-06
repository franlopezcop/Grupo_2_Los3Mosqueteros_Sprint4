const express = require('express')
const app = express()
const path = require('path')
const methodOverride =  require('method-override');
const port = process.env.PORT || 3000;

app.use(methodOverride('_method')); 
app.use(express.json());

let publicPath = path.resolve(__dirname, "../public")
app.use(express.static(publicPath))
app.use(express.json());

app.set('views', path.resolve(__dirname, './views')); 
app.set('view engine', 'ejs');

const mainRouter = require("./routes/mainRouter")
app.use("/" ,mainRouter)

const userRouter = require("./routes/userRouter")
app.use("/users", userRouter)

const productRouter = require("./routes/productRouter")
app.use("/products", productRouter)


/*app.use((req, res, next) => {
    const error = new Error('Error 404 - No se encontró la pagina solicitada');
    res.status(404).render('error', {
        message: error.message,
        path: `http://${req.hostname}:${port}${req.url}`,
        status: 404,
        error
    })
})*/

app.listen(port, () => {
    console.log("Servidor corriendo en el puerto " + port);
})


