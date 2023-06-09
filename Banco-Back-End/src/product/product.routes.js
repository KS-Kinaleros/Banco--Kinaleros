'use strict'

const express = require('express');
const api = express.Router();
const productController = require('./product.controller');

api.get('/test', productController.test);
api.post('/add', productController.add);
api.put('/update/:id', productController.update);
api.delete('/delete/:id', productController.delete);
api.get('/get', productController.get);    

module.exports = api;