// To use environment variable 
require('dotenv').config()

// Using express for creating our server
const express = require('express')
const app = express()

// Connecting to Database
const connectToDB = require('./connectionDB')
connectToDB()

// Defining the port or using the port provided by env files
const PORT = 8000

// Using json in app
const cors = require('cors')
app.use(express.json())

// USing Cors to Enable All CORS Requests
app.use(cors())

// Importing routes for Users
const userRoutes = require('./routes/userRoutes')

// Importing routes for Users
const noteRoutes = require('./routes/notesRoutes')

// Default route for testing the server
app.get('/', (req, res) => { res.send(`Working 😊`) })

// Routes for users
app.use('/api/user', userRoutes)

// Routes for note
app.use('/api/note', noteRoutes)


app.listen(PORT, () => {
    console.log(`PORT is listening on http://localhost:${PORT}`);
})