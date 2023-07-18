'use strict'

const express = require('express')
const api = express.Router()
const userController = require('./user.controller')
const { ensureAuth, isAdmin } = require('../services/authenticated')

api.get('/test', userController.test)
api.post('/add', userController.createUser)
api.post('/addAdmin', ensureAuth, userController.saveAdmin)
api.post('/login', userController.loginUser)
api.put('/update/:id', userController.updateUser)
api.put('/updateToken', ensureAuth, userController.updateUserToken)
api.delete('/delete/:id', userController.deleteUser)
api.get('/get', userController.getUsers)
api.get('/getToken', ensureAuth, userController.getUserToken)
api.get('/getMovents', userController.getUsersMovements)
api.get('/getLastMoves/:id', userController.getLastMoves)

module.exports = api
