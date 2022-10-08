const { Router } = require('express');
const { check } = require('express-validator');
const { newUser, login, renew } = require('../controllers/authController');
const handleErrors = require('../helpers/handleErrors');

const router = Router();

router.post('/', [
   check('email', 'Ingrese un email válido').isEmail(),
   check('password', 'La contraseña es obligatorio').not().isEmpty(),
   handleErrors
], login);

router.post('/new', newUser);

router.get('/renew', renew);

module.exports = router;
