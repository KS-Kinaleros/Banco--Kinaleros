'use strict'

const express = require('express')
const api = express.Router()
const depositController = require('./deposit.controller')
const { ensureAuth, isAdmin } = require('../services/authenticated')

api.get('/test', depositController.test)
api.post('/save', ensureAuth, depositController.save)
api.put('/update/:id', depositController.update)
api.delete('/cancel/:id', depositController.cancel)
api.get('/get', depositController.get)
api.get('/getToken', ensureAuth, depositController.getToken)

module.exports = api
