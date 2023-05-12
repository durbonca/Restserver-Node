const { Router } = require('express');
const { check } = require('express-validator');
const { loginPost } = require('../controllers/auth.controllers');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], loginPost);

module.exports = router;