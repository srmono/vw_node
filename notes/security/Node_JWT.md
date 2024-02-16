## Node.js JWT REST API with Layered Architecture

### Project Structure
Create the following project structure:

```plaintext
project-root
|-- src
|   |-- controllers
|   |-- models
|   |-- routes
|   |-- services
|   |-- utils
|-- .env
|-- app.js
|-- package.json
```

### Install Dependencies
Run the following commands to initialize your project and install required dependencies:

```bash
npm init -y
npm install express mongoose jsonwebtoken bcrypt dotenv
```

### Configure Environment Variables
Create a `.env` file in the project root and configure the following variables:

```plaintext
PORT=3000
SECRET_KEY=mysecretkey
DB_CONNECTION_STRING=mongodb://localhost:27017/your-database-name
```

### Set Up MongoDB Connection
Create a MongoDB connection file in `src/utils/db.js`:

```javascript
// src/utils/db.js
const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```

### Create User Model
Create a user model in `src/models/User.js`:

```javascript
// src/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
```

### Create Authentication Service
Create an authentication service in `src/services/authService.js`:

```javascript
// src/services/authService.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authService = {
  async signUp(username, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
  },

  async signIn(username, password) {
    const user = await User.findOne({ username });

    if (!user) {
      throw new Error('User not found');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1h' });
    return token;
  },
};

module.exports = authService;
```

### Create Authentication Middleware
Create an authentication middleware in `src/utils/authMiddleware.js`:

```javascript
// src/utils/authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is invalid' });
  }
};

module.exports = authMiddleware;
```

### Create User Controller and Routes
Create a user controller in `src/controllers/userController.js`:

```javascript
// src/controllers/userController.js
const authService = require('../services/authService');

const userController = {
  signUp: async (req, res) => {
    const { username, password } = req.body;

    try {
      await authService.signUp(username, password);
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  signIn: async (req, res) => {
    const { username, password } = req.body;

    try {
      const token = await authService.signIn(username, password);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  },
};

module.exports = userController;
```

Create user routes in `src/routes/userRoutes.js`:

```javascript
// src/routes/userRoutes.js
const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../utils/authMiddleware');

const router = express.Router();

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);

router.get('/profile', authMiddleware, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.userId });
});

module.exports = router;
```

### Set Up Express App
Set up the Express app in `app.js`:

```javascript
// app.js
const express = require('express');
const connectDB = require('./src/utils/db');
const userRoutes = require('./src/routes/userRoutes');

const app = express();
connectDB();

app.use(express.json());
app.use('/user', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
```

### Run the Application
```bash
node app.js
```

This provides a basic Node.js REST API with JWT authentication and a layered architecture. Ensure you handle security considerations such as securing sensitive information, validating user inputs, using HTTPS, and keeping dependencies up to date.

