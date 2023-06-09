'use strict'

const express = require('express')
const api = express.Router()
const favoriteController = require('./favorite.controller')
const {ensureAuth, isAdmin} = require('../services/authenticated') 


api.get('/test', favoriteController.test)
api.post('/save', ensureAuth,favoriteController.addFavorite)
api.put('/update/:id', ensureAuth,favoriteController.updateFavorite)   
api.delete('/delete/:id', favoriteController.deleteFavorite)
api.get('/get', ensureAuth,favoriteController.getFavorites)

module.exports = api