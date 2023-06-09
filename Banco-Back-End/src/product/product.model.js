'use strict'

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    availability: {
        type: String,
        required: true,
        enum: ['disponible', 'expirado']
    }

}, { versionKey: false });

module.exports = mongoose.model('Product', productSchema);