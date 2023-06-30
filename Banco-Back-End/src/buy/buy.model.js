'use strict'

const mongoose = require('mongoose')
const moment = require('moment')
const dateFns = require('date-fns')

const buySchema = new mongoose.Schema({
    date:{
        type: Date
    },
    date1:{
        type: String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    total:{
        type: Number
    }
}, {versionKey: false})

module.exports = mongoose.model('Buy', buySchema)