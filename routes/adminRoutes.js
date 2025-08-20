const express = require('express');
const router = express.Router();
const { auth, authorizeRoles } = require('../middleware/auth');
const controller = require('../controllers/adminController');

// Restrict to admin only
router.use(auth, authorizeRoles('admin'));

router.get('/businesses', controller.getAllBusinesses);
router.get('/business/:businessId', controller.getBusinessDetails);
router.patch('/business/:businessId/toggle', controller.toggleBusinessStatus);
router.get('/dashboard', controller.getAdminDashboard);

module.exports = router;
