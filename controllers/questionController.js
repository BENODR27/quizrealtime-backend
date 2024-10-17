const { Question } = require('../models');

exports.getAllQuestions = async (req, res) => {
  try {
    const Questions = await Question.findAll();
    res.json(Questions);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching Questions' });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const Question = await Question.findByPk(req.params.id);
    if (Question) {
      res.json(Question);
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
