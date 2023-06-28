//? Using jwt for authentication
const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    
    //? Extracting  the token from header
    const token = req.header('auth-token');

    if (!token) {
        res.status(401).send({error : "Invalid authentication token"})
    }
    try {
        let decoded = jwt.verify(token,process.env.MY_SECRET);
        req.id = decoded.user.id
        next()
    } catch (error) {
        res.status(401).send({error : "Invalid authentication token"})
    }
}

module.exports = authenticateUser