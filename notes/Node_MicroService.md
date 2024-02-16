### Microservices Architecture with Node.js REST API

#### Step 1: Define the Use Case
Consider a use case for building a greeting service with two microservices - one for generating personalized greetings and another for aggregating and serving those greetings.

#### Step 2: Set Up Individual Microservices

##### Microservice 1: Greeting Generator
```bash
# Create a new directory
mkdir greeting-generator
cd greeting-generator

# Initialize Node.js project
npm init -y

# Install necessary dependencies
npm install express

# Create a file named index.js
```

In `greeting-generator/index.js`:
```javascript
const express = require('express');
const app = express();
const port = 3001;

app.get('/generate', (req, res) => {
  const name = req.query.name || 'Guest';
  const greeting = `Hello, ${name}!`;
  res.json({ greeting });
});

app.listen(port, () => {
  console.log(`Greeting Generator microservice listening at http://localhost:${port}`);
});
```

##### Microservice 2: Greeting Aggregator
```bash
# Create a new directory
mkdir greeting-aggregator
cd greeting-aggregator

# Initialize Node.js project
npm init -y

# Install necessary dependencies
npm install express axios

# Create a file named index.js
```

In `greeting-aggregator/index.js`:
```javascript
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3002;

app.get('/aggregate', async (req, res) => {
  try {
    const name = req.query.name || 'Guest';
    const generatorResponse = await axios.get(`http://localhost:3001/generate?name=${name}`);
    const greeting = generatorResponse.data.greeting;
    res.json({ greeting });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Greeting Aggregator microservice listening at http://localhost:${port}`);
});
```

#### Step 3: API Gateway
```bash
# Create a new directory
mkdir api-gateway
cd api-gateway

# Initialize Node.js project
npm init -y

# Install necessary dependencies
npm install express axios

# Create a file named index.js
```

In `api-gateway/index.js`:
```javascript
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.get('/greet', async (req, res) => {
  try {
    const name = req.query.name || 'Guest';
    const aggregatorResponse = await axios.get(`http://localhost:3002/aggregate?name=${name}`);
    const greeting = aggregatorResponse.data.greeting;
    res.json({ greeting });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`API Gateway listening at http://localhost:${port}`);
});
```

#### Step 4: Run the Microservices and API Gateway
```bash
# In each microservices and API Gateway directory, run the following command
node index.js
```

Now you have a simple microservices architecture with an API Gateway. The API Gateway exposes an endpoint (`/greet`) that aggregates the greeting from the Greeting Aggregator microservice, which in turn fetches personalized greetings from the Greeting Generator microservice.

You can test the system by accessing `http://localhost:3000/greet` in your browser or using tools like curl or Postman.