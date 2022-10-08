

class Sockets {

   constructor(io) {
      this.io = io;

      this.socketEvents();
   }

   socketEvents() {
      this.io.on('connection', (socket) => {

         socket.on('msg-to-server', (data) => {
            console.log(data);

            this.io.emit('msg-from-server', data);
         });

      });
   }

}

module.exports = Sockets;
