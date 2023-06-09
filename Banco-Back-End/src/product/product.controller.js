'use strict'

const Product = require('./product.model');

exports.test = async (req, res) => {
    res.send({ message: 'test product is running' })
}

exports.add = async (req, res) => {
    try {
        //obtener data
        let data = req.body
        //validar que no exista duplicado
        let existProduct = await Product.findOne({ name: data.name })
        if (existProduct) return res.status(400).send({ message: 'product ya creado' })
        //crear product
        let product = new Product(data)
        await product.save()
        return res.status(200).send({ message: 'product creado' })
    } catch (err) {
        console.error(err)
    }
}

exports.update = async (req, res) => {
    try {
        //obtener id
        let productId = req.params.id
        //obtener data
        let data = req.body
        //actualizar
        let productUpdate = await Product.findOneAndUpdate(
            { _id: productId},
            data,
            { new: true, runValidators: true }
        )
        if(!productUpdate) return res.status(400).send({ message: 'product no actualizado' })
        return res.status(200).send({ message: 'product actualizado', productUpdate })
    } catch (err) {
        console.error(err)
    }
}

exports.delete = async (req, res) => { 
    try {
        //obtner id
        let productId = req.params.id
        //eliminar
        let deleteProduct = await Product.findOneAndDelete({ _id: productId })
        if(!deleteProduct) return res.status(400).send({message:"product no eliminado"})
        return res.status(200).send({message:`product ${deleteProduct.name} eliminado`})
    } catch (err) {
        console.error(err)
    }
}

exports.get = async (req, res)=>{
    try {
        let products = await Product.find()
        return res.status(200).send({message:"productos encontrados", products})
    } catch (err) {
        console.error(err)
    }
}