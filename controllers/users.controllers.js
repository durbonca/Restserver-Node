const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usersGet = (req = request, res = response) => {
    res.json({ text: "Hola Mundo - controlador" });
}

const usersPost = async (req = request, res = response) => {
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();

    res.json({
        msg: "Usuario Guardado correctamente",
        usuario
    });
}

const usersPut = (req = request, res = response) => {
    const query = req.query;
    const { id } = req.params;

    res.json({
        text: "Hola put - controlador",
        id,
        query
    });
}

const usersDelete = (req = request, res = response) => {
    const { id } = req.params;

    res.json({
        text: "Hola delete - controlador"
        , id
    });
}


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
};