const { QuizSession } = require('../models');
const { sendResponse } = require('../helper/responseHelper');

exports.getAllQuizSessions = async (req, res) => {
  try {
    const { batchId } = req.body;
    const QuizSessions = await QuizSession.findAll({where:{batchId:batchId}});
    sendResponse(res, 200, 'Quiz Sessions fetched successfully', QuizSessions);

  } catch (error) {
    res.status(500).json({ error: 'Error fetching QuizSessions' });
  }
};

exports.getQuizSessionById = async (req, res) => {
  try {
    const QuizSession = await QuizSession.findByPk(req.params.id);
    if (QuizSession) {
      res.json(QuizSession);
    } else {
      res.status(404).json({ error: 'QuizSession not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching QuizSession' });
  }
};

exports.createQuizSession = async (req, res) => {
  try {
    const qs = await QuizSession.create(req.body);
    sendResponse(res, 200, 'Quiz Session created successfully', qs);

  } catch (error) {
    res.status(500).json({ error: 'Error creating QuizSession' });
  }
};

exports.updateQuizSession = async (req, res) => {
  try {
    const [updated] = await QuizSession.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const uqs = await QuizSession.findByPk(req.params.id);
      res.status(200).json(uqs);
    } else {
      res.status(404).json({ error: 'QuizSession not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating QuizSession' });
  }
};

exports.deleteQuizSession = async (req, res) => {
  try {
    const deleted = await QuizSession.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'QuizSession not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting QuizSession' });
  }
};
