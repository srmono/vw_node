# Mongoose Documentation

[Mongoose](https://mongoosejs.com/) is an elegant MongoDB ODM (Object-Document Mapper) for Node.js. It provides a straight-forward, schema-based solution to model your application data.

## Installation

Install Mongoose using npm:

```bash
npm install mongoose
```

## Usage

### Connecting to MongoDB

```javascript
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
```

Replace the connection string with your MongoDB server details.

### Creating a Schema

Define a schema using Mongoose to specify the structure of your documents.

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  age: Number,
});

const User = mongoose.model('User', userSchema);
```

### Creating and Saving Documents

```javascript
const newUser = new User({
  username: 'john_doe',
  email: 'john@example.com',
  age: 25,
});

newUser.save((err, savedUser) => {
  if (err) return console.error(err);
  console.log('User saved:', savedUser);
});
```

### Querying Documents

```javascript
User.find({ age: { $gte: 21 } }, (err, users) => {
  if (err) return console.error(err);
  console.log('Users with age greater than or equal to 21:', users);
});
```

### Updating Documents

```javascript
User.updateOne({ username: 'john_doe' }, { age: 26 }, (err, result) => {
  if (err) return console.error(err);
  console.log('Updated:', result);
});
```

### Deleting Documents

```javascript
User.deleteOne({ username: 'john_doe' }, (err) => {
  if (err) return console.error(err);
  console.log('User deleted');
});
```

## Advanced Features

### Middleware (Hooks)

```javascript
userSchema.pre('save', function (next) {
  // Do something before saving the document
  next();
});
```

### Validation

```javascript
const emailValidator = (email) => /\S+@\S+\.\S+/.test(email);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: [emailValidator, 'Invalid email address'],
  },
  age: {
    type: Number,
    min: [18, 'Must be 18 or older'],
  },
});

```

## Conclusion

Mongoose simplifies interactions with MongoDB in a Node.js environment, providing a powerful and flexible way to work with MongoDB databases. Refer to the [official documentation](https://mongoosejs.com/docs/) for more details and advanced features.

