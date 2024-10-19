const { sendResponse } = require('../helper/responseHelper');
const { Admin } = require('../models');
const bcrypt = require('bcryptjs');

exports.getAllAdmins = async (req, res) => {
  try {
    const Admins = await Admin.findAll();
    res.json(Admins);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching Admins' });
  }
};

exports.getAdminById = async (req, res) => {
  try {
    const Admin = await Admin.findByPk(req.params.id);
    if (Admin) {
      res.json(Admin);
    } else {
      res.status(404).json({ error: 'Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching Admin' });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const ad = await Admin.create(req.body);
    sendResponse(res, 200, 'Registered successfully', ad);
  } catch (error) {
    res.status(500).json({ error: 'Error creating Admin' });
  }
};
exports.loginAdmin = async (req, res) => {
  try {
    const { empcode, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ where: { empcode } });
    if (!admin) {
      return sendResponse(res, 404, 'Admin not found');
    }

    // Compare entered password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return sendResponse(res, 401, 'Invalid credentials');
    }

    // Generate a JWT token
    // const token = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, {
    //   expiresIn: '1h', // Token will expire in 1 hour
    // });
const token="fgjdfj";
    // Send the token in the response
    sendResponse(res, 200, 'Login successful', admin);
  } catch (error) {
    sendResponse(res, 500, 'Error logging in admin');
  }
};
exports.updateAdmin = async (req, res) => {
  try {
    const [updated] = await Admin.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const uad = await Admin.findByPk(req.params.id);
      res.status(200).json(uad);
    } else {
      res.status(404).json({ error: 'Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error updating Admin' });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const deleted = await Admin.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Admin not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error deleting Admin' });
  }
};
