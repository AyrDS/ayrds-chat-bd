const { userConnect, userDisconnect, getUsers, saveMsg } = require('../controllers/socketController');
const verifyJWTinSocket = require('../helpers/socketJWT');

class Sockets {

   constructor(io) {
      this.io = io;

      this.socketEvents();
   }

   socketEvents() {
      this.io.on('connection', async (socket) => {

         const [isValid, uid] = verifyJWTinSocket(socket);

         if (!isValid) {
            console.log('Socket no identificado');
            return socket.disconnect();
         }

         const user = await userConnect(uid);
         console.log(`Se conectó ${user.name}`);

         socket.join(uid);

         this.io.emit('users-list', await getUsers());

         socket.on('personal-msg', async (payload) => {
            const msg = await saveMsg(payload);
            this.io.to(payload.to).emit('personal-msg', msg);
            this.io.to(payload.from).emit('personal-msg', msg);

         });

         socket.on('disconnect', async () => {
            await userDisconnect(uid);
            this.io.emit('users-list', await getUsers());
         });
      });
   }

}

module.exports = Sockets;
