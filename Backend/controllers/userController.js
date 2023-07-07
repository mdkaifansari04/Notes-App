
//? Using bcrypt for password hashing 
const bcrypt = require('bcrypt')

//? Using json as body query
const { json } = require('body-parser')

//? For creating an authentication token
const jwt = require('jsonwebtoken');

//? Importing User Schema 
const User = require('../models/UserSchema')

//? To validate the inputs from user
const { validationResult } = require('express-validator');

//? Function for registering Users
const registerUsers = async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        //? Getting all the inputs form body
        const { userName, email, password } = req.body

        //? Finding the user if it already exists
        const foundUser = await User.findOne({ email: email })

        if (!foundUser) {
            if(!password || password.length < 8){
                return res.status(400).json({
                    success:false,
                    message : "Password must be 8 Character long"
                })
            }
            //? Using bcrypt for hashing the password
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)


            //? Creating User with data passed
            const newUser = new User({
                userName: userName,
                email: email,
                password: hashedPassword
            })

            //? Saving user
            newUser.save()

                //? Handling error
                .then((result) => {
                    //? Creating jwt token
                    let token = jwt.sign({
                        user: {
                            id: result._id
                        }
                    }, process.env.MY_SECRET);

                    res.status(200).json({
                        success: true,
                        token: token
                    })
                })
                .catch(err => {
                    if (err) {
                        res.status(500).json({
                            success: false,
                            error: "User already exists",
                            token: err.message
                        })
                    }
                })
        } else {
            res.status(404).json({
                success: false,
                error: "User Already exits !"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: error.message
        })
    }
}

//? Function for login Users
const loginUser = async (req, res) => {
    try {
        //? Getting inputs from body
        const { email, password } = req.body;

        //? Finding User with email
        const foundUser = await User.findOne({ email: email })
        //? If we got the user
        if (foundUser) {
            //? Comparing the password
            const success = await bcrypt.compare(password, foundUser.password)
            if (!success) {
                return res.status(401).json({
                    success: false,
                    error: "Wrong Credentials"
                })
            }
            //? Creating jwt token
            let token = jwt.sign({
                user: {
                    id: foundUser._id
                }
            }, process.env.MY_SECRET);
            res.status(200).json({
                success: true,
                token: token
            })

        } else {
            res.status(401).json({
                success: false,
                error: "Wrong Credentials"
            })
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error: error.message
        })
    }
}

const getUser = async (req, res) => {
    try {
        //? Finding user by ID
        const foundUser = await User.findById(req.id).select('-password')
        //? If there is no such user return to user
        if (!foundUser) {
            return res.status(404).send("No such User")
        }
        res.status(200).json({ success: true, user: foundUser })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: error
        })
    }
}

module.exports = {
    registerUsers: registerUsers,
    loginUser: loginUser,
    getUser: getUser
}