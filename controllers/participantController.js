const { Participant } = require('../models');
const { sendResponse } = require('../helper/responseHelper');

exports.getAllParticipants = async (req, res) => {
  try {
    const Participants = await Participant.findAll();
    res.json(Participants);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching Participants' });
  }
};

exports.getParticipantById = async (req, res) => {
  try {
    const Participant = await Participant.findByPk(req.params.id);
    if (Participant) {
      res.json(Participant);
    } else {
      res.status(404).json({ error: 'Participant not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching Participant' });
  }
};

exports.createParticipant = async (req, res) => {
  try {
    const pt = await Participant.create(req.body);
    sendResponse(res, 200, 'Registered successfully', pt);

  } catch (error) {
    res.status(500).json({ error: 'Error creating Participant' });
  }
};

exports.updateParticipant = async (req, res) => {
  try {
    const [updated] = await Participant.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const upt = await Participant.findByPk(req.params.id);
      res.status(200).json(upt);
    } else {
      res.status(404).json({ error: 'Participant not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating Participant' });
  }
};

exports.deleteParticipant = async (req, res) => {
  try {
    const deleted = await Participant.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Participant not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting Participant' });
  }
};
