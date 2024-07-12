// Middleware to check for admin credentials
const adminCredentials = {
    username: 'nanisai',
    password: 'nanisai@143',
};

const authMiddleware = (req, res, next) => {
    const { username, password } = req.body;

    if (username === adminCredentials.username && password === adminCredentials.password) {
        next(); // Credentials match, proceed to the next middleware/controller
    } else {
        res.status(401).json({ message: 'Unauthorized' }); // Credentials don't match, return unauthorized
    }
};

module.exports = authMiddleware;
