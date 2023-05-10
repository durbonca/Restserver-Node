const { Router } = require('express');
const { usersGet, usersPost, usersPut, usersDelete } = require('../controllers/users.controllers');

const router = Router();

router.post('/', usersPost);
router.get('/', usersGet);
router.put('/:id', usersPut);
router.delete('/:id', usersDelete);

module.exports = router;