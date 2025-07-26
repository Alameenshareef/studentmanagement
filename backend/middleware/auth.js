const staff = require('../models/Staff')
const jwt = require('jsonwebtoken')
const ROLES = require('../constants/roles')


const protect = async (req,res,next)=>{

    const token = req.headers.authorization.split('')[1]
    if(token){
        return res.status(401).json({message:"Unauthorized"})
    }

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.staff = await staff.findById(decoded.id).select('-password')
        next()
    } catch (error) {

        return res.status(401).json({message:'Invalid token'})
        
    }

}

const isSuperAdmin = async (req,res,next)=>{

    if(req.staff.role !== ROLES.SUPER_ADMIN){
        return res.status(403).json({message:'Access denied'})
    }
  next()
}

module.exports = {protect,isSuperAdmin}