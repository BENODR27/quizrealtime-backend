const express = require('express');
const routes = require('./routes');
const authRoutes = require('./routes/auth');
const authenticateJWT = require('./middleware/authMiddleware');
const watchMan = require('./middleware/watchMan');

const helmet = require('helmet');
const compression = require('compression');
const limiter = require('./utills/ratelimiter');
const logger = require('./utills/logger');
const cors = require('cors');

const http = require('http');
const { Server } = require('socket.io');
const participantController = require('./controllers/participantController');
const { Participant } = require('./models');


const PORT = 8081;
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(helmet());
// app.use(limiter);
app.use(compression());
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies
app.use(cors({
  origin: '*', // Restrict allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

app.use('/api',/*authenticateJWT,*/watchMan, routes); // Prefix routes with /api
// app.use('/auth', authRoutes); // Authentication routes


// // Endpoint to add new sale (for testing purposes)
app.post('/api/update-score', async (req, res) => {
  try {
    const { id, totalScore } = req.body;

    // Update the participant's totalScore in the database
    const participant = await Participant.findByPk(id);
    if (!participant) {
      return res.status(404).json({ error: 'Participant not found' });
    }

    participant.totalScore = totalScore;
    await participant.save();

    // Emit the updated score via Socket.IO to all connected clients
    const updatedScoreData = {
      username: participant.username,
      id: participant.id,
      totalScore: participant.totalScore,
    };

    // Emit 'new_quiz_score' event with the updated participant data
    io.emit('new_quiz_score', updatedScoreData);

    // Send success response
    res.status(200).json({ message: 'Score updated and emitted', participant });
  } catch (error) {
    console.error('Error updating participant score:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// // Endpoint to add new sale (for testing purposes)
app.post('/api/start-quiz', async (req, res) => {
try {
  const { batchId,questionIndex } = req.body;
  io.emit('startquiz'+`-B-${batchId}-S-1`, { message: 'The quiz has started!' ,questionIndex:questionIndex});
  res.json({status:200, message: 'The quiz has started!' });
} catch (error) {
  res.json({status:500, message: 'The quiz failed to start!' });
}
});

// WebSocket connection
io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});



app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

/* Start Server */
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  // logger.info(`Server is running on port PORT`);

});
//npm audit prune

