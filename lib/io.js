const { Server } = require('socket.io');

const MessageStore = require('../lib/message-store');
const SessionStore = require('../lib/session-store');

class IO {
  constructor (server) {
    const io = new Server(server);

    io.use((socket, next) => {
      const sessionID = socket.handshake.auth.sessionID;
  
      if (sessionID) {
        const session = SessionStore.findSession(sessionID);
    
        if (session) {
          socket.session = session;
          return next();
        }
      }
    
      socket.session = SessionStore.createSession();
      next();
    });

    io.on('connection', (socket) => {
      socket.emit('session', {
        sessionID: socket.session.id
      });
    
      console.info(`Client connected on socket ${socket.id}`);

      socket.on("message", (message) => {
        if (!message) {
          return;
        }

        io.emit('message', String(message));
      });
        
      socket.on('disconnect', () => {
        console.info(`Client disconnected on socket ${socket.id}`);
      });
    });
    
    io.on('message', () => {
      console.debug(arguments)
    })
  }
}

module.exports = IO;
