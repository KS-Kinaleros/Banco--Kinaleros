'use strict'

const mongoose = require('mongoose')

const DepositSchema = mongoose.Schema({
    Date:{
        type: Date,
    },
    worker:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    noAccount:{
        type: Number,
        required: true
    },
    nameAccount:{
        type: String,
        required: true
    },
    amount:{
        type: Number,
        required: true
    }
}, {versionKey: false})

module.exports = mongoose.model('Deposit', DepositSchema)