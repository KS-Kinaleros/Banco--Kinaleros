'use strict'

const mongoose = require('mongoose')
const moment = require('moment')

const transferSchema = new mongoose.Schema({
    date: {
        type: Date,
    },
    date1:{
        type: String
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    noAccount:{
        type: Number,
        required: true
    },
    DPI:{
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