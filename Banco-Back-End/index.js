'use strict'

require('dotenv').config()
const mongoConfig = require('./configs/mongo')
const app = require('./configs/app')
const adminDef = require('./src/user/user.controller')

adminDef.admindef()
mongoConfig.connect()
app.initServer()