'use strict'

const Deposit = require('./deposit.model')
const User = require('../user/user.model')

exports.test = async (req, res) => {
    res.send({ message: 'Test deposit is running' })
}

exports.save = async (req, res) => {
    try {
        //obtener data
        let data = req.body
        //obtener token del trabajor
        let token = req.user.sub
        //verificar si la cuenta existe validando el numero de cuenta y el nombre del usuario
        let userexist = await User.findOne({ noAccount: data.noAccount })
        if( userexist.name != data.nameAccount ) return res.status(404).send({ message: 'El nombre no coincide con el número de cuenta' })
        /* if (!userexist) return res.status(404).send({ message: 'Cuenta no encontrada' }) */

        //verificar si el usuario es trabajador que hara el deposito
        let worker = await User.findOne({ _id: token })
        if (worker.role != 'ADMIN') return res.status(404).send({ message: 'No tienes permisos para realizar esta accion' })

        data.worker = token

        //agregar la cantidad de dinero a la cuenta
        await User.findOneAndUpdate({ _id: userexist._id }, {
            $inc: { money: Number(data.amount) }
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
        let user = await User.findOne({ _id: depositExist.nameAccount })

        //cambiar la cantidad de dinero en la cuenta
        user.money = ((user.money - depositExist.amount) + data.amount)
        await user.save()

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
    }
}

exports.cancel = async (req, res) => {
    try {
        //obtener id del deposito
        let depositId = req.params.id

        //ver si existe el deposito
        let depositExist = await Deposit.findOne({ _id: depositId })
        if (!depositExist) return res.status(404).send({ message: 'Deposito no encontrado' })

        //quitar la cantidad de dinero de la cuente del receptor
        let user = await User.findOne({ _id: depositExist.nameAccount })
        if (!user) return res.status(404).send({ message: 'Usuario no encontrado' })

        user.money = user.money - depositExist.amount
        await user.save()

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
        let deposit = await Deposit.findOne()
        res.send({ message: 'Depositos encontrados', deposit })
    } catch (err) {
        console.error(err)
    }
}