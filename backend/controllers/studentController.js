const { createStudentService,getStudentsService,getStudentsByIdService,updateStudentService,deleteStudentService } = require('../services/student');

exports.createStudent = async (req, res) => {    
    try {
        const student =await createStudentService(req.body)
        res.status(201).json(student);
    } catch (error) {
        console.error('Create Student Error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
}

exports.getAllStudents = async (req, res) => {
    try {
        const students = await getStudentsService()
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' }) 
    }
}

exports.getStudentsById = async (req, res) => {
    try {
        const students = await getStudentsByIdService(req.params.id)
        if (!students) {
            return res.status(404).json({ message: 'Student not found' });
        }
        res.json(students);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' }) 
    }
}

exports.updateStudent = async (req, res) => {
    try {
        const updated = await updateStudentService(req.params.id, req.body);
        res.json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' }) 
    }
}

exports.deleteStudent = async (req, res) => {
    try {
        await deleteStudentService(req.params.id);
        res.json({ message: "Deleted" }); 
    } catch (error) {
        res.status(500).json({ message: 'Server Error' }) 
    }
}