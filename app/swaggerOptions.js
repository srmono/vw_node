const swaggerDefinition = require('./swaggerDefinition');
//require('./routes/api/*.js')

module.exports = {
  swaggerDefinition,
  apis: ['./routes/api/*.js'], // Update the path to match your route files
};
