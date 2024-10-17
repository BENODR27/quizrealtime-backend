const io = require('socket.io')(server);

io.on('connection', (socket) => {
  console.log('New connection:', socket.id);

  socket.on('next-question', (question) => {
    io.emit('question-update', question);
  });

  socket.on('submit-answer', (data) => {
    // Score calculation logic
    io.emit('score-update', data);
  });
});

module.exports = io;
