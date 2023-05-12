
const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, usersPost, usersPut, usersDelete } = require('../controllers/users.controllers');
const { esRoleValido, verificarEmailExiste, verificarUsuarioByIDExiste } = require('../helpers/db-validators');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usersGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de minimo de 6 letras').isLength({ min: 6 }),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(verificarEmailExiste),
    check('rol').custom(esRoleValido),
    validarCampos
], usersPost);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(verificarUsuarioByIDExiste),
    check('rol').custom(esRoleValido),
    validarCampos
], usersPut);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(verificarUsuarioByIDExiste),
    validarCampos
], usersDelete);

module.exports = router;