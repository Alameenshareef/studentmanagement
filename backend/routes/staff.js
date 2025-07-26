const express = require('express');
const { protect, isSuperAdmin } = require('../middleware/auth');
const ctrl = require('../controllers/staffController');

const router = express.Router();

//for staff
router.get('/current', protect, ctrl.getCurrentStaff);

//for admin
router.use(protect, isSuperAdmin);

router.post('/', ctrl.createStaff);
router.get('/', ctrl.getStaff);
router.get('/:id', ctrl.getStaffById);
router.put('/:id', ctrl.updateStaff);
router.delete('/:id', ctrl.deleteStaff);
router.put('/permission/:id', ctrl.updateStaffPermission);

module.exports = router;