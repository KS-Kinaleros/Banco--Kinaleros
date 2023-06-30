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
    surname:{
        type: String
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
    },
    monthlyIncome: {
        type: Number,
    },
    money:{
        type: Number
    },
    role:{
        type: String,
    }
}, { versionKey: false })

module.exports = mongoose.model('User', userSchema)
