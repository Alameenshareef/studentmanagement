const Student = require('../models/Student')

exports.createStudentService = async (data) => {
    const student = await Student.create(data)
    return await student.save()
}

exports.getStudentsService = async () => {
    const students = await Student.find()
    return students
}

exports.getStudentsByIdService = async (id) => {
    const students = await Student.findById(id).populate('createdBy', 'name email').exec()
    return students
}


exports.updateStudentService = async (id, data) => {
    const updated = await Student.findByIdAndUpdate(id, data, { new: true })
    return updated
}

exports.deleteStudentService = async (id) => {

    await Student.findByIdAndDelete(id)
    return { message: 'Successfully Deleted the Student' }

}
