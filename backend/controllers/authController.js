const { findByEmail, createUser, verifyPassword } = require('../services/Staff')
const generateToken = require('../utils/generateToken')
const ROLES = require('../constants/roles');

exports.register = async (req, res) => {
    const { name, email, password, role } = req.body
    
    try {

        if (role && role === ROLES.STAFF) {
            return res.status(403).json({ message: 'Only Super Admin can create Staff accounts.' });
        }

        const allowedRoles = Object.values(ROLES);

        if (!allowedRoles.includes(role)) {
            return res.status(400).json({ message: 'Invalid role. Allowed roles are SuperAdmin or Staff.' });
        }

        const existingUser = await findByEmail(email)

        if (existingUser) {
            return res.status(409).json({ message: 'Email is already registered.' });
        }

        const user = await createUser({ name, email, password, role })
        const token = generateToken(user)
        res.status(201).json({ accessToken: token });

    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await findByEmail(email)
        if (!user || !(await verifyPassword(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const userWithPermissions = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        };
        res.json({ token: generateToken(userWithPermissions) });
    } catch (error) {
        console.error('Login error:', error);
    }
}