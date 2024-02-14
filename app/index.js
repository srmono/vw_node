const express = require('express');
const connetDB = require('./config/db')

//initiate app
const app = express()

//Connect Database
connetDB();

//Initiate Middleware
app.use(express.json())

// Define routes
app.use('/api/users', require('./routes/api/users'))

const PORT = process.env.PORT || 5000;

app.listen( PORT, () => {
    console.log(`Server Started at port ${PORT}`)
})
