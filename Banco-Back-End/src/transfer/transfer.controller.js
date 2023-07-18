'use strict'

const Transfer = require('./transfer.model')
const User = require('../user/user.model')
const Favorites = require('../favorite/favorite.model')
const moment = require('moment')

exports.test = async (req, res) => {
    res.send({ message: 'Test transfer is running' })
}

exports.save = async (req, res) => {
    try {
        //obtener el token del usuario que hara la transferencia
        let token = req.user.sub

        //obtener data
        let data = {
            date: new Date(),
            date1: moment().format('MMMM Do YYYY, h:mm:ss a'),
            sender: token,
            noAccount: req.body.noAccount,
            DPI: req.body.DPI,
            amount: req.body.amount
        }
        //guardar la data del remitente


        let senderExit = await User.findOne({ _id: token })
        if (!senderExit) return res.status(400).send({ message: "El usuario no existe" })

        //el usuario no puede hacer mas de 10000 en transferencias al dia
        let horaIni = moment().startOf('day').toDate()/* .utcOffset(-6).subtract(6, 'hour').toDate() *//* .format('M/D/YYYY, h:mm A') */;

        let horaFin = moment().endOf('day').toDate()/* .utcOffset(-6).subtract(6, 'hour').toDate() *//* .format('M/D/YYYY, h:mm A') */;

        //obtener las transferencias del dia
        let totalTransfers = await Transfer.aggregate([
            {
                $match: {
                    sender: senderExit._id,
                    date: {
                        $gte: horaIni,
                        $lte: horaFin
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" }
                }
            }
        ]);

        // Validar si el total de transferencias supera los 10000
        if (totalTransfers.length > 0 && totalTransfers[0].total >= 10000) {
            return res.status(400).send({ message: "Ha excedido el límite de transferencias para el día actual" });
        }

        //validar que el remitente tenga el dinero suficiente
        let sender = await User.findOne({ _id: token })
        if (sender.money < data.amount) return res.status(400).send({ message: "No tiene suficiente dinero" })
        else if (data.amount > 2000) return res.status(400).send({ message: "No puede transferir mas de 2000" })
        else if (data.amount < -1) return res.status(400).send({ message: 'No se puede transferir cantidades negativas' })

        //validar que el numero de cuenta que pone sea el mismo que el nombre
        let receiver = await User.findOne({ noAccount: data.noAccount })
        if (!receiver) return res.status(400).send({ message: 'No existe el usuario' })
        else if (receiver.DPI != data.DPI) return res.status(400).send({ message: 'El DPI no coincide con el numero de cuenta' })

        data.receiver = receiver._id

        await User.findOneAndUpdate({ _id: sender._id }, {
            $inc: { money: Number(data.amount) * -1, movements: Number(1) }
        }, { new: true });

        await User.findOneAndUpdate({ _id: receiver._id }, {
            $inc: { money: Number(data.amount), movements: Number(1) }
        }, { new: true });

        //guardar transferencia
        let transfer = new Transfer(data)
        await transfer.save()
        return res.status(200).send({ message: "Transferencia realizada con exito" })
    } catch (err) {
        console.error(err)
        return res.status(400).send({ message: "Error al guardar la transferencia", err })
    }
}

//update no tiene que ir en el proyecto
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

        //validacion de tiempo
        let hora = new Date()
        let hora2 = new Date(transfer.date)

        let diff = (hora - hora2) / (1000 * 60)
        console.log(diff);

        if (diff >= 1) return res.status(400).send({ message: "No se puede modificar la transferencia :(, ya paso mas de 1 minuto" })


        //validar que el sender tenga el dinero suficiente
        if (sender.money < data.amount) return res.status(400).send({ message: "No tiene suficiente dinero" })

        //devolver la cantidad anterior al sender
        await User.findOneAndUpdate({ _id: sender._id }, {
            $inc: { money: Number(transfer.amount) }
        }, { new: true });
        //quitar la cantidad nueva al sender
        await User.findOneAndUpdate({ _id: sender._id }, {
            $inc: { money: Number(data.amount) * -1 }
        }, { new: true });

        //quitar la cantidad anterior al receiver
        await User.findOneAndUpdate({ _id: receiver._id }, {
            $inc: { money: Number(transfer.amount) * -1 }
        }, { new: true });
        //agregar la cantidad nueva al receiver
        await User.findOneAndUpdate({ _id: receiver._id }, {
            $inc: { money: Number(data.amount) }
        }, { new: true });


        //actualizar la transferencia
        let updateTransfer = await Transfer.findOneAndUpdate(
            { _id: transferId },
            data,
            { new: true }
        )
        if (!updateTransfer) return res.status(400).send({ message: "No se realizo la actualizacion de la transferencia" })
        return res.send({ message: "Actualizacion de transferencia realizada con exito" })
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

        //validacion de tiempo
        let hora = new Date()
        let hora2 = new Date(transfer.date)

        let diff = (hora - hora2) / (1000 * 60)
        console.log(diff);


        if (diff >= 1) return res.status(400).send({ message: "No se puede revertir la transferencia :(" })

        let sender = await User.findOne({ _id: transfer.sender })
        let receiver = await User.findOne({ _id: transfer.receiver })

        //regresar la cantidad de dinero al emisor
        await User.findOneAndUpdate({ _id: sender._id }, {
            $inc: { money: Number(transfer.amount), movements: Number(1) * -1 }
        }, { new: true });

        await User.findOneAndUpdate({ _id: receiver._id }, {
            $inc: { money: Number(transfer.amount) * -1, movements: Number(1) * -1 }
        }, { new: true });

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

exports.getTransfersByUser = async (req, res) => {
    try {
        let token = req.user.sub
        let transfers = await Transfer.find({
            $or: [{ sender: token }, { receiver: token }]
        }).populate('sender', 'name').populate('receiver', 'name')
        return res.send({ message: "transferencias del usuario", transfers })
    } catch (err) {
        console.error(err)
    }
}

//Transferencias para favoritos
exports.transferFavorite = async (req, res) => {
    try {
        //obtener token de la persona que hara la transferencia
        let token = req.user.sub
        //obtener data
        let data = {
            date: new Date(),
            date1: moment().format('MMMM Do YYYY, h:mm:ss a'),
            sender: token
        }

        data.amount = req.body.amount

        //buscar si existe el sender
        let senderExit = await User.findOne({_id: token})

        //obtener el id del favorito
        let favoriteId = req.params.id
        //buscar si existe el favorito
        let existeFavorite = await Favorites.findOne({ _id: favoriteId })
        if (!existeFavorite) return res.status(400).send({ message: "No existe el favorito" })

        //buscar si existe el receptor
        let receiverExiste = await User.findOne({ DPI: existeFavorite.DPI })
        if (!receiverExiste) return res.status(400).send({ message: "No existe el usuario" })

        //el usuario no puede hacer mas de 10000 en transferencias al dia
        let horaIni = moment().startOf('day').toDate()/* .utcOffset(-6).subtract(6, 'hour').toDate() *//* .format('M/D/YYYY, h:mm A') */;
        let horaFin = moment().endOf('day').toDate()/* .utcOffset(-6).subtract(6, 'hour').toDate() *//* .format('M/D/YYYY, h:mm A') */;


        //obtener las transferencias del dia
        let totalTransfers = await Transfer.aggregate([
            {
                $match: {
                    sender: senderExit._id,
                    date: {
                        $gte: horaIni,
                        $lte: horaFin
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" }
                }
            }
        ]);

        // Validar si el total de transferencias supera los 10000
        if (totalTransfers.length > 0 && totalTransfers[0].total >= 10000) {
            return res.status(400).send({ message: "Ha excedido el límite de transferencias para el día actual" });
        }

        //vertificar si tiene dinero suficiente
        let sender = await User.findOne({ _id: token })
        if (data.amount > 2000) return res.status(400).send({ message: "No puede transferir mas de 2000" })
        else if (sender.money < data.amount) return res.status(400).send({ message: "No tiene suficiente dinero" })
        else if (data.amount <= 0) return res.status(400).send({ message: 'No se puede transferir por debajo de 0' })

        data.receiver = receiverExiste._id
        data.noAccount = receiverExiste.noAccount
        data.DPI = receiverExiste.DPI


        //quitar el dinero de la persona que hace la transferencia
        await User.findOneAndUpdate({ _id: sender._id }, {
            $inc: { money: Number(data.amount) * -1, movements: Number(1) }
        }, { new: true });

        //agregar el dinero a la persona que recibe la transferencia
        await User.findOneAndUpdate({ _id: receiverExiste._id }, {
            $inc: { money: Number(data.amount), movements: Number(1) }
        }, { new: true });

        //guardar la transferencia
        let transfer = new Transfer(data)
        await transfer.save()
        return res.status(200).send({ message: "Transferencia realizada con exito" })
    } catch (err) {
        console.error(err)
        return res.status(400).send({ message: "Error al guardar la transferencia", err })
    }
}
