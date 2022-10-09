const { Router } = require('express');
const { param } = require('express-validator');
const { getChat } = require('../controllers/messagesController');
const handleErrors = require('../middlewares/handleErrors');
const validateJWT = require('../middlewares/validateJWT');

const router = Router();

router.get('/:from', [
   validateJWT,
   param('from', 'Debe ser un id válido').isMongoId(),
   handleErrors
], getChat);

module.exports = router;
