const { createStaffService, getStaffService, getStaffByIdService, updateStaffService,
  deleteStaffService,
  updateStaffPermission,
  getCurrentStaffService } = require("../services/Staff");


exports.createStaff = async (req, res) => {
  const staff = await createStaffService(req.body);
  await staff.save();
  res.status(201).json(staff);
};

exports.getStaff = async (req, res) => {
  const staff = await getStaffService();
  res.json(staff);
};

exports.getStaffById = async (req, res) => {
  const staff = await getStaffByIdService(req.params.id);
  if (!staff) {
    return res.status(404).json({ message: 'Staff not found' });
  }
  res.json(staff);
};

exports.updateStaff = async (req, res) => {

  const updated = await updateStaffService(req.params.id, req.body);
  res.json(updated);
};

exports.updateStaffPermission = async (req, res) => {

  const updated = await updateStaffPermission(req.params.id, req.body);
  res.json(updated);
};


exports.deleteStaff = async (req, res) => {
  await deleteStaffService(req.params.id);
  res.json({ message: "Deleted" });
};

exports.getCurrentStaff = async (req, res) => {

  try {
    const staff = await getCurrentStaffService(req.staff._id);
    if (!staff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    res.status(200).json({ data: staff });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch staff",
      error: error.message,
    });
  }
};