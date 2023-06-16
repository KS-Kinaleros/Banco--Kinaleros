'use strict'

const express = require('express')
const api = express.Router()
const userController = require('./user.controller')

api.get('/test', userController.test)
api.post('/add', userController.createUser)
api.post('login', userController.loginUser)
api.put('/update/:id', userController.updateUser)
api.delete('/delete/:id', userController.deleteUser)
api.get('/get', userController.getUsers)

module.exports = api