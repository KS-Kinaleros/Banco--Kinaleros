'use strict'

const Buy = require('./buy.model');
const User = require('../user/user.model');
const Product = require('../product/product.model')
const moment = require('moment')

exports.test = (req, res) => {
    res.status(200).send({ message: 'Testing the buy controller' });
}

exports.buy = async (req, res) => {
    try {
        let token = req.user.sub
        let productId = req.params.id

        //validar que el producto exista
        let productExist = await Product.findOne({ _id: productId })
        if (!productExist) return res.status(404).send({ message: 'El producto no existe' })

        //validar que el usuario tenga el dinero suficiente
        let userExist = await User.findOne({ _id: token })
        if (!userExist) return res.status(400).send({ message: 'El usuario no existe' })

        //validar que el usuario tenga el dinero suficiente
        if (userExist.money < productExist.price) return res.status(400).send({ message: 'No tienes dinero suficiente para la compra' })

        await User.findOneAndUpdate({ _id: userExist._id }, {
            $inc: { money: Number(productExist.price) * -1 }
        }, { new: true })

        let data = {
            user: token,
            date: new Date(),
            date1: moment().format('MMMM Do YYYY, h:mm:ss a'),
            product: productId,
            total: productExist.price
        }

        let buy = new Buy(data)
        await buy.save()
        return res.status(200).send({ message: 'Compra exitosa' })

    } catch (err) {
        console.error(err);
    }
}

exports.cancelBuy = async (req, res) => {
    try {
        let token = req.user.sub
        let buyId = req.params.id

        //validar que la compra exista
        let buyExist = await Buy.findOne({ _id: buyId })
        if (!buyExist) return res.status(404).send({ message: 'La compra no existe' })

        //validar que el usuario exista
        let userExist = await User.findOne({ _id: token })
        if (!userExist) return res.status(404).send({ message: 'El usuario no existe' })

        //solo tiene 5 minutos para cancelar la compra
        let hora = new Date()
        let hora2 = new Date(buyExist.date)

        console.log(hora);
        console.log(hora2);

        let diff = (hora - hora2) / (1000 * 60)
        console.log(diff);

        if (diff >= 5) return res.status(400).send({ message: 'Ya no puede cancelar la compra' })

        //devolver el dinero al usuario
        await User.findOneAndUpdate({ _id: userExist._id }, {
            $inc: { money: Number(buyExist.total) }
        }, { new: true })

        let deleteBuy = await Buy.findOneAndDelete({ _id: buyId })
        if (!deleteBuy) return res.status(400).send({ message: 'No se pudo cancelar la compra' })
        return res.status(200).send({ message: 'Compra cancelada con exito' })
    } catch (err) {
        console.error(err);
    }
}

exports.getBuys = async (req, res) => {
    try {
        let token = req.user.sub
        let buys = await Buy.find({ user: token }).populate('product', 'name')
        return res.send({ message: 'Buys', buys })
    } catch (err) {
        console.error(err);
    }
}

//obtener las compras que hizo la persona
