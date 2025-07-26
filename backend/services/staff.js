const Staff = require('../models/Staff')
const bcrypt = require('bcryptjs')
const ROLES = require('../constants/roles')



exports.createStaffService = async (data) => {
    let password = data.password
    if (password) {
        password = await bcrypt.hash(password, 10)
    }

    const bodyData = {
        name: data.name,
        email: data.email,
        password,
        role: ROLES.STAFF,
        permissions: data.permissions
    }
    const staff = new Staff(bodyData)
    return await staff.save()

}

exports.getStaffService = async () => {

    const staff = await Staff.find({ role: 'staff' })
    return staff
}


exports.getStaffByIdService = async(id) => {
 const staff = await Staff.findById(id)
 return staff

}

exports.updateStaffService = async (id, data) => {
    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10)
    }

    const updated = await Staff.findByIdAndUpdate(id, data, { new: true })
    return updated


}


exports.updateStaffPermission = async (id, data) => {

    const updated = await Staff.findByIdAndUpdate(id, { permissions: data }, { new: true })

    return updated

}

exports.deleteStaffService = async (id) => {

    await Staff.findByIdAndDelete(id)
    return { message: "Deleted Staff Successfully" }

}


exports.findByEmail = async (email) => {

    const user = await Staff.findOne({ email })
    return user

}

exports.createUser = async ({ ...user }) => {
    const hashedPassword = await bcrypt.hash(user.password, 10)
    const newUser = new Staff({ ...user, password: hashedPassword })
    await newUser.save()
    return newUser



}


exports.getCurrentStaffService = async (id) => {
    const staff = await Staff.findById(id).select('-password')
    return staff


}


exports.verifyPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword)

}