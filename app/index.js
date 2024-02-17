const express = require('express');
const connetDB = require('./config/db')
const rateLimit = require('express-rate-limit');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swaggerOptions');

//initiate app
const app = express()

//Connect Database
connetDB();

//Swagger config js doc
const specs = swaggerJsdoc(swaggerOptions);

// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


//Rate Limit
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // limit each IP to 5 requests per windowMs
  });


app.use(limiter);

//Initiate Middleware
app.use(express.json())

// Define routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

const PORT = process.env.PORT || 5000;

app.listen( PORT, () => {
    console.log(`Server Started at port ${PORT}`)
})
