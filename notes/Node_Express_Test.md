Certainly! Let's create a simple Node.js Express application for a To-Do list with real-time updates using Socket.io for the real-time communication. We'll set up TDD for this application.

### Step 1: Initialize Your Project

```bash
# Create a new Node.js project
npm init -y

# Install necessary dependencies
npm install express socket.io --save
npm install jest supertest --save-dev
```

### Step 2: Create the Express App

Create an `app.js` file for your Express application:

```javascript
// app.js
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());

// Route to get all tasks
app.get('/tasks', (req, res) => {
  // Implement logic to retrieve tasks from the database
  res.json([]);
});

// Route to add a new task
app.post('/tasks', (req, res) => {
  const { task } = req.body;
  // Implement logic to add a task to the database

  // Notify clients about the new task
  io.emit('newTask', task);

  res.status(201).json({ message: 'Task added successfully' });
});

// ... other routes and middleware

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server, io };
```

### Step 3: Write Test Cases

Create a `__tests__` directory and write test cases for the routes in the `app.test.js` file:

```javascript
// __tests__/app.test.js
const request = require('supertest');
const { app, server, io } = require('../app');

afterAll((done) => {
  // Close the server connection after all tests
  server.close(done);
});

describe('GET /tasks', () => {
  it('should return an empty array of tasks', async () => {
    const response = await request(app).get('/tasks');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});

describe('POST /tasks', () => {
  it('should add a new task and notify clients', async () => {
    const task = { description: 'Do the laundry' };
    const response = await request(app)
      .post('/tasks')
      .send({ task })
      .set('Accept', 'application/json');

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ message: 'Task added successfully' });

    // Simulate a socket.io event to check if clients are notified
    const emitSpy = jest.spyOn(io, 'emit');
    expect(emitSpy).toHaveBeenCalledWith('newTask', task);
  });
});
```

### Step 4: Run Tests

Run your tests using the following command:

```bash
npm test
```

### Step 5: Implement the Features

Now, implement the features in `app.js` to make the tests pass. For example, implement the logic to retrieve and add tasks to a database, and emit the 'newTask' event when a new task is added.

### Step 6: Test the Real-Time Functionality

You can use a Socket.io client library to simulate real-time updates in your tests or create a separate test specifically for the real-time functionality. Consider using libraries like `socket.io-client` for this purpose.
