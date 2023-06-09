'use strict'

const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    noAccount: {
        type: String,
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    DPI: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    job: {
        type: String,
        required: true
    },
    monthlyIncome: {
        type: Number,
        required: true
    },
    role:{
        type: String,
    }
}, { versionKey: false })

module.exports = mongoose.model('User', userSchema)