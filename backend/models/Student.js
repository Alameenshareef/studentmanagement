const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number },
    grade: { type: String },
    contactInfo: {
        phone: { type: String },
        email: { type: String },
        address: { type: String },
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User   "
    },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Student",studentSchema)
