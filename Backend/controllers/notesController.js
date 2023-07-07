
//? Importing notes schema 
const Note = require('../models/NotesSchema')

//? Importing user schema 
const User = require('../models/UserSchema')

//? Create note of requested user
const createNote = async (req, res) => {
    try {
        const { title, description, tag } = req.body
        const user = req.id

        const foundUser = await User.findById(req.id)
        if (!foundUser) {
            return res.status(500).json({ success: false, message: "No such user fond" })
        }
        const newNote = new Note({
            user, title, description, tag
        })
        newNote.save()
            .then((result) => {
                res.status(200).json({ success: true, note: result })
            })
            .catch(err => {
                res.status(500).json({ success: false, message: err.message })
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//? Get all the notes of requested user
const getNotes = async (req, res) => {
    try {
        const foundUser = await User.findById(req.id)

        if (!foundUser) {
            return res.status(401).json({ success: false, message: "No such user" })
        }
        const foundNotes = await Note.find({ user: req.id })

        // If found notes is not belongs to found user
        if (!foundNotes.user === foundUser._id) {
            return res.status(401).json({ success: false, message: "Not Allowed" })
        }

        res.status(200).json({ success: true, note: foundNotes })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//? Update the notes of requested user for requested note
const updateNotes = async (req, res) => {
    try {
        const foundUser = await User.findById(req.id)

        // If no such user is found
        if (!foundUser) {
            return res.status(401).json({ success: false, error: "No such user" })
        }
        const foundNote = await Note.findById(req.params.id)

        // If found notes is not belongs to found user
        if (toString(foundUser._id) !== toString(foundNote.user)) {
            return res.status(401).json({ success: false, error: "Not Allowed" })
        }

        // If no such notes
        if (!foundNote) {
            return res.status(204).json({ success: true, message: "No notes found" })
        }

        // If the no notes available
        if (foundNote.length <= 0) {
            return res.status(204).json({ success: true, message: 'No notes available' })
        }

        let updatedNote = await Note.updateOne({ _id: req.params.id }, req.body)
        res.status(200).json({ success: true, note: updatedNote })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

//? Delete the notes of requested user of requested note
const deleteNotes = async (req, res) => {
    try {
        const foundUser = await User.findById(req.id)

        // If no such user is found
        if (!foundUser) {
            return res.status(401).json({ success: false, message: "No such user" })
        }
        const foundNotes = await Note.findOne({ user: req.id })

        // If found notes is not belongs to found user
        if (!foundNotes.user === foundUser._id) {
            return res.status(401).json({ success: false, message: "Not Allowed" })
        }

        // If the no notes available
        if (foundNotes.length <= 0) {
            return res.status(204).json({ success: false, message: 'No notes available' })
        }
        // Finding the note to be deleted 
        const note = await Note.findById(req.params.id)
        // If note not found 
        if (!note) {
            return res.status(404).json({ message: "Notes not available" })
        }

        // Deleted the note 
        Note.deleteOne({ _id: req.params.id })
            .then((result) => {
                res.status(200).json({ success: true, message: "Note Deleted Successfully" })
            })
            .catch(err => {
                res.status(501).json({ success: false, message: "Something Went Wrong" })
            })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {
    createNote: createNote,
    getNotes: getNotes,
    updateNotes: updateNotes,
    deleteNotes: deleteNotes
}