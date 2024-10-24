const express = require('express');
const router = express.Router();
const questionController = require('../controllers/questionController');

// Define routes
router.post('/', questionController.getAllQuestions);
router.get('/:id', questionController.getQuestionById);
router.post('/save', questionController.createQuestion);
router.put('/:id', questionController.updateQuestion);
router.delete('/:id', questionController.deleteQuestion);

module.exports = router;
