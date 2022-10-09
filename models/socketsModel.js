

class Sockets {

   constructor(io) {
      this.io = io;

      this.socketEvents();
   }

   socketEvents() {
      this.io.on('connection', (socket) => {

         //TODO: Validar JWT
         //!Si el token no es válido, desconectar

         //TODO: Saber que usuario esta activo

         //TODO: Emitir todos los usuarios conectados

         //TODO: Socket Join

         //TODO: Escuchar cuando el cliente manda un mensaje
         //message-personal

         //TODO: Disconnect
         // Marcar en la DB que el usuario se desconecto

         //TODO: Todos los usuarios conectados

      });
   }

}

module.exports = Sockets;
