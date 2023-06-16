'use strict'

const express = require('express')
const api = express.Router()
const transferController = require('./transfer.controller')
const {ensureAuth, isAdmin} = require('../services/authenticated') 

api.get('/test', transferController.test)
api.post('/save', ensureAuth ,transferController.save)
api.put('/update/:id', transferController.update)
api.delete('/cancel/:id', transferController.cancel)
api.get('/get', transferController.getTransfers)

module.exports = api
