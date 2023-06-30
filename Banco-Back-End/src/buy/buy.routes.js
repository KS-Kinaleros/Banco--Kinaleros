'use strict'

const express = require('express');
const api = express.Router();
const buyController = require('./buy.controller');
const { ensureAuth, isAdmin } = require('../services/authenticated')

api.get('/test', buyController.test)
api.post('/saveBuy/:id', ensureAuth, buyController.buy)
api.delete('/cancelBuy/:id', ensureAuth, buyController.cancelBuy)
api.get('/getBuys', ensureAuth, buyController.getBuys)

module.exports = api;