const jwt = require('jsonwebtoken');
const extractToken = require('../helpers/extractToken');

const validateJWT = (req, res, next) => {

   try {
      const token = extractToken(req);
      if (!token) {
         return res.status(401).json({
            ok: false,
            msg: 'Token no existe'
         });
      }

      const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);
      req.uid = uid;

      next();
   } catch (error) {
      res.status(401).json({
         ok: false,
         msg: 'Token inválido'
      });
   }

}

module.exports = validateJWT;
