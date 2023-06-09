'use strict'

const Transfer = require('./transfer.model')
const User = require('../user/user.model')

exports.test = async (req, res) => {
    res.send({ message: 'Test transfer is running' })
}

exports.save = async (req, res) => {
    try {
        //obtener data
        let data = req.body
        //obtener el token del usuario que hara la transferencia
        let token = req.user.sub
        //validar que el remitente tenga el dinero suficiente
        let sender = await User.findOne({ _id: token })
        if (sender.money < data.amount) return res.status(400).send({ message: "No tiene suficiente dinero" })

        //guardar la data del remitente
        data.sender = token

        //validar que el numero de cuenta que pone sea el mismo que el nombre
        let receiver = await User.findOne({ noAccount: data.noAccount })
        if (receiver._id != data.receiver) return res.status(400).send({ message: "El numero de cuenta no coincide con el nombre" })

        //quitar el dinero de la cuenta del remitente
        sender.money = sender.money - data.amount
        console.log(sender.money)
        await sender.save()

        //agregar el dinero a la cuenta del destinatario
        receiver.money = receiver.money + data.amount
        console.log(receiver.money)
        await receiver.save()

        //guardar transferencia
        let transfer = new Transfer(data)
        await transfer.save()
        return res.send({ message: "Transferencia realizada con exito" })
    } catch (err) {
        console.error(err)
    }
}

exports.update = async (req, res) => {
    try {
        //obtener id de la transferencia
        let transferId = req.params.id
        //obtener data de la transferencia
        let data = req.body

        //obtener datos de la transferencias
        let transfer = await Transfer.findOne({ _id: transferId })
        if (!transfer) return res.status(400).send({ message: "No se encontro la transferencia" })

        let sender = await User.findOne({ _id: transfer.sender })
        let receiver = await User.findOne({ _id: transfer.receiver })

        //cambiar la cantidad que se sumo a la cuenta del remitente
        sender.money = ((sender.money + transfer.amount) - data.amount)
        await sender.save()
        console.log(sender.money)
        //cambiar la cantidad que se quito a la cuenta del destinatario
        receiver.money = ((receiver.money - transfer.amount) + data.amount)
        await receiver.save()
        console.log(receiver.money)

        //actualizar la transferencia
        let updateTransfer = await Transfer.findOneAndUpdate(
            { _id: transferId },
            data,
            { new: true }
        )
        if(!updateTransfer) return res.status(400).send({message: "No se realizo la actualizacion de la transferencia"})
        return res.send({message: "Actualizacion de transferencia realizada con exito"})
    } catch (err) {
        console.error(err)
    }
}

exports.cancel = async (req, res) => {
    try {
        //obtener id de la transferencia
        let transferId = req.params.id

        //obtener datos de la transferencias
        let transfer = await Transfer.findOne({ _id: transferId })
        if (!transfer) return res.status(400).send({ message: "No se encontro la transferencia" })

        let sender = await User.findOne({ _id: transfer.sender })
        let receiver = await User.findOne({ _id: transfer.receiver })
        /*         console.log(sender.money)
                console.log(receiver.money) */

        //regresar la cantidad de dinero al emisor
        sender.money = sender.money + transfer.amount
        console.log(sender.money)
        await sender.save()
        //quitar la cantidad de dinero al receptor
        receiver.money = receiver.money - transfer.amount
        console.log(receiver.money)
        await receiver.save()

        //eliminar la transferencia
        let deleteTransfer = await Transfer.findOneAndDelete({ _id: transferId })
        if (!deleteTransfer) return res.status(400).send({ message: "No se realizo la cancelacion de la transferencia" })
        return res.send({ message: "Cancelacion de transferencia realizada con exito" })
    } catch (err) {
        console.error(err)
    }
}

exports.getTransfers = async (req, res) => {
    try {
        let transfers = await Transfer.find()
        return res.send({ message: "transferencias", transfers })
    } catch (err) {
        console.error(err)
    }
}