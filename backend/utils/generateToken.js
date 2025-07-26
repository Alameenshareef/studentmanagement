const jwt = require("jsonwebtoken")

const generateToken = (user)=>{
    return jwt.sign({
        id: user.id,
        role: user.role,
        name: user.name,
        email: user.email,
        permissions: user.permissions || {}
    },
    process.env.JWT_SECRET,
    {expiresIn: "7d"}
)

}


module.exports = generateToken