# Node.js Core Modules

Node.js comes with a set of built-in modules that provide essential functionalities for various tasks. Below is a list of some core modules in Node.js, along with brief explanations and examples.

## 1. **fs (File System)**

The `fs` module provides methods for interacting with the file system. It allows reading and writing files, creating and deleting directories, and more.

```javascript
const fs = require('fs');

// Example: Read a file
fs.readFile('example.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log('File content:', data);
});
```

## 2. **http**

The `http` module enables the creation of HTTP servers and clients. It provides functionalities for handling HTTP requests and responses.

```javascript
const http = require('http');

// Example: Create an HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, World!\n');
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

## 3. **path**

The `path` module provides utilities for working with file and directory paths. It helps in constructing and manipulating file paths in a platform-independent manner.

```javascript
const path = require('path');

// Example: Joining and resolving paths
const absolutePath = path.resolve(__dirname, 'subfolder', 'file.txt');
console.log('Absolute path:', absolutePath);
```

## 4. **events**

The `events` module allows the creation and handling of custom events. It provides an `EventEmitter` class for emitting and listening for events.

```javascript
const EventEmitter = require('events');

// Example: Using EventEmitter
const myEmitter = new EventEmitter();

myEmitter.on('event', () => {
  console.log('Event emitted');
});

myEmitter.emit('event');
```

## 5. **util**

The `util` module provides utility functions that are commonly used in Node.js applications. It includes functions for formatting strings, dealing with inheritance, and more.

```javascript
const util = require('util');

// Example: Promisify a callback-based function
const readFileAsync = util.promisify(fs.readFile);

readFileAsync('example.txt', 'utf8')
  .then((data) => console.log('File content:', data))
  .catch((err) => console.error('Error reading file:', err));
```

## 6. **crypto**

The `crypto` module provides cryptographic functionality, including hash functions, HMAC, and more.

```javascript
const crypto = require('crypto');

// Example: Create a SHA256 hash
const hash = crypto.createHash('sha256');
hash.update('Hello, Node.js!');
console.log('Hashed message:', hash.digest('hex'));
```

## 7. **querystring**

The `querystring` module provides utilities for parsing and formatting URL query strings.

```javascript
const querystring = require('querystring');

// Example: Parse and stringify query string
const params = querystring.parse('name=John&age=30');
console.log('Parsed params:', params);

const queryString = querystring.stringify({ name: 'Jane', age: 25 });
console.log('Generated query string:', queryString);
```

## Conclusion

These are just a few examples of the many core modules available in Node.js. Understanding and leveraging these modules can greatly enhance your ability to develop robust and feature-rich applications in Node.js.
