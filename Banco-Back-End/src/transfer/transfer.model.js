'use strict'

const mongoose = require('mongoose')

const transferSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    noAccount:{
        type: Number,
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: true
    }
}, {versionKey: false})

module.exports = mongoose.model('Transfer', transferSchema)