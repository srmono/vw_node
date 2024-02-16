Swagger is a popular tool for documenting APIs, and in Node.js, you can use the `swagger-jsdoc` and `swagger-ui-express` packages to easily integrate Swagger API documentation into your project. Here are the steps to implement Swagger API documentation in a Node.js application:

1. **Install required packages:**

   ```bash
   npm install swagger-jsdoc swagger-ui-express express --save
   ```

2. **Create a Swagger configuration file:**

   Create a `swaggerDefinition.js` file where you define the basic information about your API.

   ```javascript
   module.exports = {
     info: {
       title: 'Your API Title',
       version: '1.0.0',
       description: 'Your API description',
     },
     basePath: '/',
   };
   ```

3. **Create a Swagger options file:**

   Create a `swaggerOptions.js` file that includes the path to your `swaggerDefinition.js` file.

   ```javascript
   const swaggerDefinition = require('./swaggerDefinition');

   module.exports = {
     swaggerDefinition,
     apis: ['path-to-your-routes/*.js'], // Specify the path to your route files
   };
   ```

4. **Integrate Swagger in your Node.js application:**

   In your main application file (e.g., `app.js` or `index.js`), add the following code to set up Swagger documentation:

   ```javascript
   const express = require('express');
   const swaggerJsdoc = require('swagger-jsdoc');
   const swaggerUi = require('swagger-ui-express');
   const swaggerOptions = require('./swaggerOptions');

   const app = express();

   // Initialize Swagger
   const specs = swaggerJsdoc(swaggerOptions);

   // Serve Swagger UI
   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

   // Your API routes go here...

   // Start the server
   const port = process.env.PORT || 3000;
   app.listen(port, () => {
     console.log(`Server is running on port ${port}`);
   });
   ```

   Make sure to replace `'path-to-your-routes/*.js'` with the actual path to your route files.

5. **Document your API routes:**

   In your route files, use JSDoc annotations to document each route. Swagger will use these annotations to generate the API documentation.

   ```javascript
   /**
    * @swagger
    * /example:
    *   get:
    *     description: Get a list of examples
    *     responses:
    *       200:
    *         description: Successful response
    */
   app.get('/example', (req, res) => {
     // Your route logic here...
     res.send('Example route');
   });
   ```

6. **Run your application:**

   Start your Node.js application, and navigate to `http://localhost:3000/api-docs` (or the appropriate URL where you mounted Swagger UI) in your browser to access the Swagger documentation.

That's it! You have successfully implemented Swagger API documentation in your Node.js application.