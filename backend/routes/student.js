const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { checkPermission } = require('../middleware/permission');
const ctrl = require('../controllers/studentController');

router.use(protect);

router.post('/', checkPermission('create'), ctrl.createStudent);
router.get('/', checkPermission('read'), ctrl.getAllStudents);
router.get('/:id', checkPermission('read'), ctrl.getStudentsById);
router.put('/:id', checkPermission('update'), ctrl.updateStudent);
router.delete('/:id', checkPermission('delete'), ctrl.deleteStudent);

module.exports = router;
