const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usersGet = async (req, res) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .limit(limite)
            .skip(desde)
    ]);

    res.json({
        total,
        usuarios
    });
}

const usersPost = async (req, res) => {
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

const usersPut = async (req, res) => {
    const { id } = req.params;
    const { _id, google, password, correo, ...resto } = req.body;

    // TODO validar contra base de datos
    if (password) {
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuarioDB = await Usuario.findByIdAndUpdate(id, resto, { new: true });

    res.json({
        msg: "Usuario Actualizado correctamente",
        usuarioDB
    });
}

const usersDelete = async (req, res) => {
    const { id } = req.params;

    const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });
    const usuarioAutenticado = req.usuario;

    res.json({
        text: "Hola delete - controlador",
        usuarioAutenticado,
        usuario
    });
}


module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete
};