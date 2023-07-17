'use strict'

const Deposit = require('./deposit.model')
const User = require('../user/user.model')
const moment = require('moment')

exports.test = async (req, res) => {
    res.send({ message: 'Test deposit is running' })
}

exports.save = async (req, res) => {
    try {
        //obtener token del trabajor
        let token = req.user.sub

        //obtener data
        let data = {
            date: new Date(),
            date1: moment().format('MMMM Do YYYY, h:mm:ss a'),
            worker: token,
            noAccount: req.body.noAccount,
            nameAccount: req.body.nameAccount,
            amount: req.body.amount
        }
        //verificar si la cuenta existe validando el numero de cuenta y el nombre del usuario
        let userexist = await User.findOne({ noAccount: data.noAccount })
        if (userexist.name != data.nameAccount) return res.status(404).send({ message: 'El nombre no coincide con el número de cuenta' })
        /* if (!userexist) return res.status(404).send({ message: 'Cuenta no encontrada' }) */

        //verificar si el usuario es trabajador que hara el deposito
        let worker = await User.findOne({ _id: token })
        if (worker.role != 'ADMIN') return res.status(404).send({ message: 'No tienes permisos para realizar esta accion' })

        //agregar la cantidad de dinero a la cuenta
        await User.findOneAndUpdate({ _id: userexist._id }, {
            $inc: { money: Number(data.amount), movements: Number(1) }
        }, { new: true })


        //guardar el deposito
        let deposit = new Deposit(data)
        await deposit.save()
        return res.status(200).send({ message: 'Deposito realizado exitosamente' })
    } catch (err) {
        console.error(err)
    }
}

exports.update = async (req, res) => {
    try {
        //obtener el id del deposito
        let depositId = req.params.id
        //obtener data
        let data = req.body

        //validar que si exista el deposito
        let depositExist = await Deposit.findOne({ _id: depositId })
        if (!depositExist) return res.status(404).send({ message: 'Deposito no encontrado' })

        //validar que si exista el usuario
        let user = await User.findOne({ name: depositExist.nameAccount })

        //quitar el dinero
        await User.findOneAndUpdate({ _id: user._id }, {
            $inc: { money: Number(depositExist.amount) * -1}
        }, { new: true });

        //agregar la nueva cantidad
        await User.findOneAndUpdate({ _id: user._id }, {
            $inc: { money: Number(data.amount)}
        }, { new: true });

        //actualizar el deposito
        let updateDeposit = await Deposit.findOneAndUpdate(
            { _id: depositId },
            data,
            { new: true }
        )
        if (!updateDeposit) return res.status(404).send({ message: 'Error al actualizar el deposito' })
        return res.status(200).send({ message: 'Deposito actualizado exitosamente' })
    } catch (err) {
        console.error(err)
        return res.status(400).send({ message: "Error al editar el deposito", err })
    }
}

exports.cancel = async (req, res) => {
    try {
        //obtener id del deposito
        let depositId = req.params.id

        //ver si existe el deposito
        let depositExist = await Deposit.findOne({ _id: depositId })
        if (!depositExist) return res.status(404).send({ message: 'Deposito no encontrado' })

        let hora = new Date()
        let hora2 = new Date(depositExist.date)

        let diff = (hora - hora2) / (1000 * 60)
        console.log(diff)

        if (diff >= 1) return res.status(400).send({ message: 'No se puede cancelar el deposito, ya pasaron mas de 1 minuto' })

        //quitar la cantidad de dinero de la cuente del receptor
        let user = await User.findOne({ noAccount: depositExist.noAccount })
        if (!user) return res.status(404).send({ message: 'Usuario no encontrado' })

        await User.findOneAndUpdate({ _id: user._id }, {
            $inc: { money: Number(depositExist.amount) * -1, movements: Number(1) * -1 }
        }, { new: true })

        //eliminar el deposito
        let deleteDeposit = await Deposit.findOneAndDelete({ _id: depositId })
        if (!deleteDeposit) return res.status(404).send({ message: 'Error al cancelar el deposito' })
        return res.status(200).send({ message: 'Deposito cancelado exitosamente' })
    } catch (err) {
        console.error(err)
    }
}

exports.get = async (req, res) => {
    try {
        let deposits = await Deposit.find()
        res.send({ message: 'Depositos encontrados', deposits })
    } catch (err) {
        console.error(err)
    }
}

//obtener los depositos que le hicieron a una persona
exports.getToken = async (req, res) => {
    try {
        let token = req.user.sub
        //buscar por el tokbe
        let userToken = await User.findOne({ _id: token })
        if (!userToken) return res.status.send({ message: 'Usuario no existe' })

        let depositsPerson = await Deposit.find({ noAccount: userToken.noAccount })
        res.send({ message: 'Depositos', depositsPerson })
    } catch (err) {
        console.log(err)
    }
}

//get para el historial
/* exports.getHistory = async (req, res) => {
    try {
        let token = req.user.sub
    } catch (err) {
        console.log(err)
    }
} */
