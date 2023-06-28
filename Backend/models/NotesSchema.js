const mongoose = require('mongoose')

const NotesSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    title : {
        type : String,
        require : true
    },
    description : {
        type : String,
        default : ""
    },
    tag : {
        type : String
    }
}, {timestamps : true})

const Note = mongoose.model('note', NotesSchema)

module.exports = Note