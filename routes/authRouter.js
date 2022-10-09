const { Router } = require('express');
const { check } = require('express-validator');
const { newUser, login, renew } = require('../controllers/authController');
const handleErrors = require('../middlewares/handleErrors');
const validateJWT = require('../middlewares/validateJWT');

const router = Router();

router.post('/', [
   check('email', 'Ingrese un email válido').isEmail(),
   check('password', 'La contraseña es obligatorio').not().isEmpty(),
   handleErrors
], login);

router.post('/new', [
   check('name', 'El nombre es obligatorio').isString().not().isEmpty(),
   check('password', 'La contraseña es obligatorio').isString().not().isEmpty(),
   check('email', 'Ingrese un email válido').isEmail(),
   handleErrors
], newUser);

router.get('/renew', validateJWT, renew);

module.exports = router;
