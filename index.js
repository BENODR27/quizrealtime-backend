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
app.post('/start-quiz', async (req, res) => {
  io.emit('quiz_started', { message: 'The quiz has started!' });
  res.json({ message: 'The quiz has started!' });
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
server.listen(3000, () => {
  console.log('Server is running on port 3000');
  logger.info(`Server is running on port 3000`);

});
//npm audit prune

