'use strict'

const mongoose = require('mongoose')

const favoritesSchema = mongoose.Schema({
    noAccount: {
        type: Number,
        required: true
    },
    DPI: {
        type: Number,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    favorite:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    person:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, { versionKey: false })

module.exports = mongoose.model('Favorites', favoritesSchema)