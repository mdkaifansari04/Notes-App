// Creating router 
const express = require('express')
const router = express.Router()

// To create a validation we are using express validator
const { check } = require('express-validator');

// Importing user controller function
const {registerUsers, loginUser, getUser} = require('../controllers/userController')

// Importing authentication middleware
const authenticateUser = require('../middleware/authentication')

//* Default route - http://localhost:5000

//* Route: 1.  To registering user by using POST - /api/user/register - Login not required
router.post('/register', [
    // email must be a valid email
    check('email', 'Email is not valid').isEmail(),
    // password must be at least * chars long
    check('password', 'Password must be 8 character long').isLength({ min: 8 })
    ], registerUsers)

//*  Route: 2. Login user by using POST - /api/user/login - Login not required
router.post('/login',[
    // email must be a valid email
    check('email', 'Email is not valid').isEmail(),
    ], loginUser)

router.get('/getuser', authenticateUser, getUser)



module.exports = router