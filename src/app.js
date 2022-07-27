const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 3000;


let publicPath = path.resolve(__dirname, "../public")
app.use(express.static(publicPath))

app.set('views', path.resolve(__dirname, './views')); 
app.set('view engine', 'ejs');

const mainRouter = require("./routes/mainRouter")
app.use("/" ,mainRouter)

const userRouter = require("./routes/userRouter")
app.use("/users", userRouter)

const productRouter = require("./routes/productRouter")
app.use("/products", productRouter)



app.listen(port, () => {
    console.log("Servidor corriendo en el puerto " + port);
})