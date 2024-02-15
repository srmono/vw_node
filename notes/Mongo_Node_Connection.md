# Connecting MongoDB with Node.js - Step by Step Guide

MongoDB is a popular NoSQL database, and connecting it with Node.js is a common task for building applications. Below is a step-by-step guide to help you connect MongoDB with Node.js.

## 1. Install Node.js and npm

Ensure that you have Node.js and npm (Node Package Manager) installed on your machine. You can download and install them from [Node.js official website](https://nodejs.org/).

## 2. Create a Node.js Project

Create a new directory for your Node.js project and navigate into it.

```bash
mkdir my-mongo-project
cd my-mongo-project
```

Initialize a new Node.js project:

```bash
npm init -y
```

## 3. Install MongoDB Node.js Driver

Install the official MongoDB Node.js driver using npm:

```bash
npm install mongodb
```

## 4. Create a MongoDB Cluster

Set up a MongoDB cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) or locally on your machine.

## 5. Connect to MongoDB in Your Node.js Application

Create a JavaScript file (e.g., `app.js`) and use the following code to connect to MongoDB:

```javascript
const { MongoClient } = require('mongodb');

// Replace the connection string with your MongoDB connection string
const uri = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>?retryWrites=true&w=majority';

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    // To close the connection when done
    // await client.close();
  }
}

// Call the function to connect
connectToMongoDB();
```

Replace `<username>`, `<password>`, and `<database>` in the connection string with your MongoDB Atlas credentials.

## 6. Run Your Node.js Application

Run your Node.js application using the following command:

```bash
node app.js
```

Check the console output for the "Connected to MongoDB" message, indicating a successful connection.

Now you have successfully connected your Node.js application to MongoDB. You can use the `client` object to perform various operations such as querying, inserting, updating, and deleting documents in MongoDB.

```

Customize it based on your specific project requirements.