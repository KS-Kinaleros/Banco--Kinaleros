'use strict'

const Favorites = require('./favorite.model')
const User = require('../user/user.model')

exports.test = async (req, res) => {
    res.send({ message: 'test favorites is running' })
}

exports.addFavorite = async (req, res) => {
    try {
        //obtener data
        let data = req.body
        //obtener id del cliente
        let token = req.user.sub

        //validar que exista el usuario
        let userexist = await User.findOne({noAccount: data.noAccount})
        if(!userexist) return res.send({message: 'No existe el usuario'})

        //validar que no exista algun favorito con el mismo alias
        let existFavorite = await Favorites.findOne({ nickname: data.nickname, person: token })
        if (existFavorite) return res.send({ message: 'Ya existe un favorito con ese alias' })

        //guardar
        let favoritess = new Favorites({ noAccount: data.noAccount, DPI: data.DPI, nickname: data.nickname, favorite: userexist._id, person: token})
        await favoritess.save()
        res.status(200).send({ message: 'Favorito guardado' })
    } catch (err) {
        console.error(err)
    }
}

exports.updateFavorite = async (req, res) => {
    try {
        //obtener el id del favorito
        let favoriteId = req.params.id
        //obtener el token del cliente
        let token = req.user.sub
        //obtener data
        let data = req.body
        //validar que no exista algun favorito con el mismo alias
        let existFavorite = await Favorites.findOne({ nickname: data.nickname, person: token })
        if (existFavorite) return res.send({ message: 'Ya existe un favorito con ese alias' })
        //actualizar
        let favoriteUpdate = await Favorites.findOneAndUpdate(
            { _id: favoriteId },
            data,
            { new: true }
        )
        if(!favoriteUpdate) return res.send({message:"Favorito no actualizado"})
        return res.status(200).send({message:"Favorito actualizado", favoriteUpdate})
    } catch (err) {
        console.error(err)
    }
}

exports.deleteFavorite = async (req, res) => {
    try {
        //obtener el id del favorito
        let favoriteId = req.params.id
        //eliminar
        let deleteFavorite = await Favorites.findOneAndDelete({ _id: favoriteId })
        if(!deleteFavorite) return res.send({message:"Favorito no eliminado"})
        return res.status(200).send({message: `Favorito ${deleteFavorite.nickname} eliminado` })
    } catch (err) {
        console.error(err)
    }
}

exports.getFavorites = async (req, res) => {
    try {
        //obtener el id del cliente
        let token = req.user.sub
        //obtener favoritos del cliente
        let favorites = await Favorites.find({ person: token })
        return res.status(200).send({ message: 'Favoritos encontrados', favorites })
    } catch (err) {
        console.error(err)
    }
}