const express = require('express');
const router = express.Router();
const quizSessionController = require('../controllers/quizSessionController');

// Define routes
router.post('/', quizSessionController.getAllQuizSessions);
router.get('/:id', quizSessionController.getQuizSessionById);
router.post('/save', quizSessionController.createQuizSession);
router.put('/:id', quizSessionController.updateQuizSession);
router.delete('/:id', quizSessionController.deleteQuizSession);

module.exports = router;
