const jwt = require('jsonwebtoken');

const extractTokeninSocket = (socket) => {
   if (socket.handshake.query.authorization && socket.handshake.query.authorization.split(' ')[0] === 'Bearer') {
      return socket.handshake.query.authorization.split(' ')[1];
   }
   return null;
}

const verifyJWTinSocket = (socket) => {

   const token = extractTokeninSocket(socket);

   try {
      const { uid } = jwt.verify(token, process.env.SECRET_JWT_SEED);

      return [true, uid];
   } catch (error) {
      return [false, null];
   }


}

module.exports = verifyJWTinSocket;
