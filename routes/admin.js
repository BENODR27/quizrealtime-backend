const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Define routes
router.get('/', adminController.getAllAdmins);
router.get('/:id', adminController.getAdminById);
router.post('/', adminController.createAdmin);
router.put('/:id', adminController.updateAdmin);
router.delete('/:id', adminController.deleteAdmin);

router.post('/register', adminController.createAdmin);
router.post('/login', adminController.loginAdmin);

module.exports = router;
