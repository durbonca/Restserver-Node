const { request, response } = require('express');

const usersGet = (req = request, res = response) => {
    res.json({ text: "Hola Mundo - controlador" });
}

const usersPost = (req = request, res = response) => {
    const { nombre, edad } = req.body;
    res.json({
        text: "Hola post - controlador",
        nombre,
        edad
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