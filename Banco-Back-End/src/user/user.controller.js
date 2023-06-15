'use strict'

const User = require('./user.model')
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
            email: "admin@",
            password: "admin",
            role: "admin"
        }
        data.password = await encrypt(data.password)
        let existUser = await User.findOne({name: "Admin"})
        if(existUser) return console.log("Administrador por default ya ha sido creado")
        let defUser = new User(data)
        await defUser.save()
        return console.log("Administrador creado correctamente")
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
            let token = await createToken(user)
            return res.send({ message: "user logged satisfactoriamente", token })
        }
        return res.status(400).send({ message: "invalid credentials" })
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
        if ( data.monthlyIncome < 100) return res.status(400).send({ message: "No se puede crear la cuenta con menos de Q100" })

        data.role = 'CLIENT'
        data.password = await encrypt(data.password)

        data.money = data.monthlyIncome

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

exports.deleteUser = async (req, res) => {
    try {
        //obtener id del usuario
        let userId = req.params.id

        let userDelete = await User.findOneAndDelete({_id: userId})
        if(!userDelete) return res.status(400).send({message: "Error deleting account"})
        return res.send({message: "Account deleted successfully", userDelete})
    } catch (err) {
        console.error(err)
    }
}

exports.getUsers = async (req, res) => {
    try {
        //obtener usuarios
        let users = await User.find()
        return res.send({message: "Users obtained successfully", users})
    } catch (err) {
        console.error(err)
    }
}