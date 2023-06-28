// Creating a connection to my myNotesDB
const mongoose = require('mongoose')

const connectToDB = async() =>{
    try {
        await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("Connected to DB")
    } catch (error) {
        console.log("Connection Error" + error);
    }
}

module.exports = connectToDB