'use strict'

const User = require('./user.model')
const Transfer = require('../transfer/transfer.model')
const Deposit = require('../deposit/deposit.model')
const Buy = require('../buy/buy.model')
const { validateData, encrypt, checkPassword, checkUpdate } = require('../utils/validate')
const { createToken } = require('../services/jwt')

exports.test = async (req, res) => {
    res.send({ message: 'test user controller' })
}

exports.admindef = async (req, res) => {
    try {
        let data = {
            name: "Admin",
            username: "admin",
            DPI: "1234567891012",
            phone: "12345678",
            email: "admin@gmail.com",
            password: "admin",
            role: "ADMIN"
        }
        data.password = await encrypt(data.password)
        let existUser = await User.findOne({ name: "Admin" })
        if (existUser) return console.log("Administrador por default ya ha sido creado")
        let defUser = new User(data)
        await defUser.save()
        return console.log("Administrador creado correctamente")
    } catch (err) {
        console.error(err)
    }
}

exports.saveAdmin = async (req, res) => {
    try {
        //obtener token
        let token = req.user.sub
        //buscar el usuario
        let userAdmin = await User.findOne({_id: token})
        //validar que si sea admin
        if(userAdmin.role !== "ADMIN") return res.status(400).send({message: "No tienes permisos para crear un administrador"})

        //obtener data
        let data = req.body;

        let params = {
            password: data.password
        }
        let validate = validateData(params)
        if (validate) return res.status(400).send(validate)
        //encriptar password
        data.password = await encrypt(data.password)

        data.role = "ADMIN"

        let user = new User(data)
        await user.save()
        return res.send({ message: "Admin creado exitosamente" })

    } catch (err) {
        console.error(err)
    }
}


exports.loginUser = async (req, res) => {
    try {
        //obtener data
        let data = req.body;
        let credentials = {
            username: data.username,
            password: data.password
        }
        let msg = validateData(credentials)
        if (msg) return res.status(400).send(msg)
        //validar que si exista
        let user = await User.findOne({ username: data.username })
        //validar la contraseña
        if (user && await checkPassword(data.password, user.password)) {
            let userLogged = {
                name: user.name,
                username: user.username,
                role: user.role
            }
            let token = await createToken(user)
            return res.send({ message: "Inicio de sesión exitoso", token, userLogged })
        }
        return res.status(400).send({ message: "Credenciales invalidas" })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: "" })
    }
}

exports.createUser = async (req, res) => {
    try {
        //obtener data
        let data = req.body;
        let params = {
            password: data.password
        }
        let validate = validateData(params)
        if (validate) return res.status(400).send(validate)

        //generar No.Cuenta
        let account = Math.floor(Math.random() * (9999999999 - 1000000000) + 1000000000)
        data.noAccount = account

        //validar que no cree la cuenta si el dinero es menor a 100
        if (data.monthlyIncome < 100) return res.status(400).send({ message: "No se puede crear la cuenta con menos de Q100" })

        data.role = 'CLIENT'
        data.password = await encrypt(data.password)


        let user = new User(data)
        await user.save()
        return res.send({ message: "Cuentra creada exitosamente" })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: "Error creating account" })
    }
}

exports.updateUser = async (req, res) => {
    try {
        //obtener data
        let data = req.body;
        //obtener id del usuario
        let userId = req.params.id
        //validar que si exista
        let userexist = User.findOne({ _id: userId })
        if (!userexist) return res.status(400).send({ message: "User not found" })

        //validar que no se actualize ni el dpi ni la password
        if (data.DPI || data.password || Object.entries(data).length === 0 || data.role) return res.status(400).send({ message: 'No se pueden cambiar estos datos' });
        let userUpdate = await User.findOneAndUpdate(
            { _id: userId },
            data,
            { new: true }
        )
        if (!userUpdate) return res.status(400).send({ message: "Error updating account" })
        return res.send({ message: "Account updated successfully", userUpdate })
    } catch (err) {
        console.error(err)
        return res.status(500).send({ message: "Error updating account" })
    }
}


exports.updateUserToken = async (req, res) => {
    try {
        //obtener el token
        let token = req.user.sub
        //obtener data
        let data = req.body;
        //actualizar
        let userUpdate = await User.findOneAndUpdate(
            { _id: token },
            data,
            { new: true }
        )
        if (!userUpdate) return res.status(400).send({ message: "Error al actualizar estos datos" })
        return res.send({ message: "Datos actualizados correctamente", userUpdate })
    } catch (err) {
        console.error(err)
    }
}

exports.deleteUser = async (req, res) => {
    try {
        //obtener id del usuario
        let userId = req.params.id

        let userDelete = await User.findOneAndDelete({ _id: userId })
        if (!userDelete) return res.status(400).send({ message: "Error deleting account" })
        return res.send({ message: "Cuenta Eliminada", userDelete })
    } catch (err) {
        console.error(err)
    }
}

exports.getUsers = async (req, res) => {
    try {
        //obtener usuarios solo si son rol cliente
        let users = await User.find({ /* role: "CLIENT" */ })
        return res.send({ message: "Users obtained successfully", users })
    } catch (err) {
        console.error(err)
    }
}

exports.getUserToken = async (req, res) => {
    try {
        let token = req.user.sub
        let user = await User.findOne({ _id: token })
        return res.send({ message: "User", user })
    } catch (err) {
        console.log(err)
    }
}

//personas con mas movimientos
exports.getUsersMovements = async (req, res) => {
    try {
        let users = await User.find().sort({ movements: -1 }).limit(5)
        return res.send({ message: 'usuarios', users })
    } catch (err) {
        console.error(err)
    }
}

exports.getLastMoves = async (req, res) => {
    try {
        let userId = req.params.id
        let userD = await User.findOne({ _id: userId })

        //obtener los ultimos 5 movimientos
        let transfers = await Transfer.find({ sender: userId }).populate('sender', 'name').populate('receiver', 'name').sort({ date: -1 }).limit(5)
        let deposits = await Deposit.find({ noAccount: userD.noAccount }).populate('worker', 'name').sort({ date: -1 }).limit(5)
        let buys = await Buy.find({ user: userId }).sort({ date: -1 }).populate('user', 'name').populate('product', 'name').limit(5)

        const combinedResults = [...transfers, ...deposits, ...buys]

        // Ordena el arreglo por la hora en orden descendente
        const sortedResults = combinedResults.sort((a, b) => b.hora - a.hora);

        // Obtiene los últimos 5 registros
        const latestData = sortedResults.slice(0, 5);

        return res.send({ message: 'Ultimos movimientos', latestData })

    } catch (err) {
        console.error(err)
    }
}
