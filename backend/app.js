const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/error')

app.use(express.json())
app.use(cookieParser());
//import all routes
const products = require('./routes/product');
const auth = require('./routes/auth')
app.use('/api/v1',products)
console.log('print 0')
app.use('/api/v1',auth)
//middleware to hundle errors (make sure it use after the routes)
app.use(errorMiddleware)

module.exports = app