const mongoose = require('mongoose')
const ROLES = require('../constants/roles')


const staffSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: [ROLES.SUPER_ADMIN, ROLES.STAFF], default: ROLES.STAFF },
    permissions: {
        create: { type: Boolean, default: false },
        read: { type: Boolean, default: false },
        update: { type: Boolean, default: false },
        delete: { type: Boolean, default: false },
    },
    createdAt: { type: Date, default: Date.now }


})

module.exports = mongoose.model("Staff",staffSchema)