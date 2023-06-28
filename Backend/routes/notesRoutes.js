//? Creating router 
const express = require('express')
const router = express.Router()

//? To create a validation we are using express validator
const { check, body } = require('express-validator');

//? Importing authentication middleware
const authenticateUser = require('../middleware/authentication')

//? Importing notes controller 
const { createNote, getNotes, updateNotes, deleteNotes } = require("../controllers/notesController")

//* Route 1 :  To create a note by using POST - /api/note/create - Login required
router.post('/create', authenticateUser, [
    check('title', 'Title should be 5 character long').isLength({ min: 3 }),
    check('description', 'Description must be 5 character long').isLength({ min: 5 })
], createNote)

//* Route 2 :  To create a note by using POST - /api/note/get - Login required
router.get('/get', authenticateUser, getNotes)

//* Route 3 :  Update a note by using POST - /api/note/update - Login required
router.put('/update/:id', authenticateUser, updateNotes)

//* Route 3 :  Update a note by using POST - /api/note/update - Login required
router.delete('/delete/:id', authenticateUser, deleteNotes)


module.exports = router