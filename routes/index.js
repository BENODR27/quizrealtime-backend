
const express = require('express');
const router = express.Router();

const adminRoutes = require('./admin');
const batchRoutes = require('./batch');
const participantRoutes = require('./participant');
const questionRoutes = require('./question');
const quizSessionRoutes = require('./quizSession');

// // Use routes
router.use('/admin', adminRoutes);
router.use('/batch', batchRoutes);
router.use('/participant', participantRoutes);
router.use('/question', questionRoutes);
router.use('/quizSession', quizSessionRoutes);

module.exports = router;
