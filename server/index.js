const app = require('./maverick.js');
const socket = require('socket.io');

const server = app.listen(process.env.PORT, function() {
  console.log(`listening on port ${process.env.PORT}!`);
});

const io = socket(server);
io.on('connection', function(socket) {
  console.log('Made a connection from server!', socket.id)

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })

  socket.on('chat', (data) => {
    io.sockets.emit('chat', data)
  })
})

