const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const loginPost = async (req, res) => {
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

    try {
        res.json({
            msg: 'login ok', correo, password
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