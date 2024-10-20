const { Batch } = require('../models');
const { sendResponse } = require('../helper/responseHelper');

exports.getAllBatches = async (req, res) => {
  try {
    const Batchs = await Batch.findAll();
    sendResponse(res, 200, 'Batched Fetched successfully', Batchs);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching Batchs' });
  }
};

exports.getBatchById = async (req, res) => {
  try {
    const Batch = await Batch.findByPk(req.params.id);
    if (Batch) {
      res.json(Batch);
    } else {
      res.status(404).json({ error: 'Batch not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching Batch' });
  }
};

exports.createBatch = async (req, res) => {
  try {
    const bt = await Batch.create(req.body);
    res.status(201).json(bt);
  } catch (error) {
    res.status(500).json({ error: 'Error creating Batch' });
  }
};

exports.updateBatch = async (req, res) => {
  try {
    const [updated] = await Batch.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const ubt = await Batch.findByPk(req.params.id);
      res.status(200).json(ubt);
    } else {
      res.status(404).json({ error: 'Batch not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating Batch' });
  }
};

exports.deleteBatch = async (req, res) => {
  try {
    const deleted = await Batch.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Batch not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting Batch' });
  }
};
