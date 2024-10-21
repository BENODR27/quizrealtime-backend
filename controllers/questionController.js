const { Question } = require('../models');
const { sendResponse } = require('../helper/responseHelper');
const { cacheInstance } = require('../utills/nodecache');


exports.getAllQuestions = async (req, res) => {
  try {
    const { batchId } = req.body;
    const cacheQuestionKey = `Questions-${batchId}`;
    console.log(cacheQuestionKey);

    // Check cache for the questions
    const cachedQuestions = cacheInstance.get(cacheQuestionKey);

    if (cachedQuestions) {
      console.log("Questions cache fetched");
      return sendResponse(res, 200, 'Questions fetched successfully', cachedQuestions);
    }

    // Only query the database if the cache is not available
    const questions = await Question.findAll({
      where: { batchId: batchId },
    });

    // Set cache and return the questions
    cacheInstance.set(cacheQuestionKey, questions);
    sendResponse(res, 200, 'Questions fetched successfully', questions);

  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Error fetching questions' });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const qn = await Question.findByPk(req.params.id);
    if (qn) {
      sendResponse(res, 200, 'Question Fetched successfully', qn);
    } else {
      res.status(404).json({ error: 'Question not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching Question' });
  }
};

exports.createQuestion = async (req, res) => {
  try {
    const qn = await Question.create(req.body);
    res.status(201).json(qn);
  } catch (error) {
    res.status(500).json({ error: 'Error creating Question' });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const [updated] = await Question.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const uq = await Question.findByPk(req.params.id);
      res.status(200).json(uq);
    } else {
      res.status(404).json({ error: 'Question not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating Question' });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const deleted = await Question.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Question not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting Question' });
  }
};
