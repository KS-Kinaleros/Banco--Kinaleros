'use strict'

const mongoose = require('mongoose')

const DepositSchema = mongoose.Schema({
    date:{
        type: Date,
    },
    date1:{
        type: String
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
    amounts:{
        type: Number,
        required: true
    }
}, {versionKey: false})

module.exports = mongoose.model('Deposit', DepositSchema)