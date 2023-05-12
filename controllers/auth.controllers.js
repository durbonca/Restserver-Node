const { request, response } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generar-jwt');

const loginPost = async (req = request, res = response) => {
    const { correo, password } = req.body;

    // verificar si email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) return res.status(400).json({
        msg: 'Usuario / Password no son correctos - correo'
    });

    // usuario activo?
    if (!usuario.estado) return res.status(400).json({
        msg: 'Usuario / Password no son correctos - estado: false'
    });

    // Password correcto
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword) return res.status(400).json({
        msg: 'Usuario / Password no son correctos - password'
    });

    // Generar JWT
    const token = await generarJWT(usuario.id);

    try {
        res.json({
            msg: 'login ok',
            usuario,
            token
        });

    } catch (error) {

        console.log(error);
        return res.status(500).json({
            msg: 'Error de servidor'
        });

    }
};

module.exports = {
    loginPost
};