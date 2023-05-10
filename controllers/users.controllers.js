const { response } = require('express');

const usersGet = (req, res = response) => {
    res.status(418)
        .json({ text: "Hola Mundo - controlador" });
}

const usersPost = (req, res) => {
    const { nombre, edad } = req.body;
    res.json({
        text: "Hola post - controlador",
        nombre,
        edad
    });
}

const usersPut = (req, res) => {
    const query = req.query;
    const { id } = req.params;

    res.status(418)
        .json({
            text: "Hola put - controlador",
            id,
            query
        });
}

const usersDelete = (req, res) => {
    const { id } = req.params;

    res.status(418)
        .json({
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