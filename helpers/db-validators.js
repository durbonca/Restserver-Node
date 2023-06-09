const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if (!existeRol) throw new Error(`El rol ${rol} no está registrado en la BD`);
}

const verificarEmailExiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) throw new Error(`El correo: ${correo}, ya está registrado`);
}

const verificarUsuarioByIDExiste = async (id = '') => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) throw new Error(`El usuario con el ID: ${id}, no existe`);
}

module.exports = { esRoleValido, verificarEmailExiste, verificarUsuarioByIDExiste };