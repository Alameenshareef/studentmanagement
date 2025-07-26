const ROLES = require('../constants/roles')

exports.checkPermission = (action)=>{

    return (req,res,next)=>{
        if(req.staff.role === ROLES.SUPER_ADMIN) return next()
            const permission = req.staff.permissions || {}
        if(
            permission.create||
            permission.read||
            permission.update||
            permission.delete
        ){
            return next()
        }
        return res.status(403).json({message:"Permission denied"})
    }

}

