'use strict'

const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
// rutas
const userRoutes = require('../src/user/user.routes')
const favoriteRoutes = require('../src/favorite/favorite.routes')
const productRoutes = require('../src/product/product.routes')
const transferRoutes = require('../src/transfer/transfer.routes')
const depositRoutes = require('../src/deposit/deposit.routes')
const buyRoutes = require('../src/buy/buy.routes')

const app = express()
const port = process.env.PORT || 3100

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
//para usar las rutas
app.use('/user', userRoutes )
app.use('/favorite', favoriteRoutes )
app.use('/product', productRoutes )
app.use('/transfer', transferRoutes )
app.use('/deposit', depositRoutes )
app.use('/buy', buyRoutes )

exports.initServer = () =>{
    app.listen(port)
    console.log(`Server is running in port ${port}`)
}