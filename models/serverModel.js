const path = require('path');
const http = require('http');
const express = require('express');
const cors = require('cors');
const socketio = require('socket.io');
const Sockets = require('./socketsModel');
const dbConnection = require('../database/config');

class Server {

   constructor() {
      this.app = express();
      this.port = process.env.PORT || '3001';

      //Connection DB
      dbConnection();

      this.server = http.createServer(this.app);
      this.io = socketio(this.server);
   }

   middlewares() {
      // this.app.use(express.static(path.resolve(__dirname, '../public')));
      this.app.use(express.json());

      this.app.use(cors());

      this.app.use('/api/login', require('../routes/authRouter'));
   }

   socketConfig() {
      new Sockets(this.io);
   }

   execute() {
      this.middlewares();

      this.socketConfig();

      this.app.get('/', (req, res) => {
         res.sendFile(path.join(__dirname, '..', '/public/index.html'))
      })

      this.server.listen(this.port, () => {
         console.log(`Server corriendo en puerto ${this.port}`);
      });
   }

}

module.exports = Server;
