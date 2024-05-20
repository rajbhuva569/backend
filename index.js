require('dotenv').config()
const express = require('express')
const app = express()
const cors = require("cors")
const bcrypt = require('bcrypt');
app.use(express.static('public'))
let ejs = require('ejs');
app.set('view engine', 'ejs');
const port = process.env.PORT
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/RajBhuva.postman_collection.json-OpenApi3Json.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
require('./confing/userdata')
const authotication = require('./route/auth')
const productbase = require('./route/products')
const student = require('./route/studnet');
const buyproduct = require('./route/buyproduct')
const pages = require('./route/pages')

app.use(express.json())
// app.use(cors())
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use('/api', authotication)
app.use('/product', productbase)
app.use('/student', student)
app.use('/buyproduct', buyproduct)
app.use('/', pages)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})  