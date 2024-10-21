const { Question } = require('../models');
const { sendResponse } = require('../helper/responseHelper');
const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 600 });

exports.getAllQuestions = async (req, res) => {
  try {
    const cacheQuestionKey="Questions";
    const cachedQuestions = cache.get(cacheQuestionKey);
    if(cachedQuestions){
      console.log("question cache fetched");
      sendResponse(res, 200, 'Questions Fetched successfully', cachedQuestions);
    }else{
      const Questions = await Question.findAll();
      cache.set(cacheQuestionKey, Questions); 
      sendResponse(res, 200, 'Questions Fetched successfully', Questions);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching Questions' });
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
