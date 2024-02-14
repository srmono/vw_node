# Creating Custom Modules in Node.js

In Node.js, creating custom modules allows you to encapsulate and reuse code across different parts of your application. Here's a step-by-step guide on how to create and use custom modules:

## 1. **Create Your Module File**

Create a new JavaScript file for your custom module, for example, `myModule.js`.

```javascript
// myModule.js

// Example function in the custom module
function greet(name) {
  return `Hello, ${name}!`;
}

// Example variable in the custom module
const version = '1.0.0';

// Export the function and variable to make them accessible from other files
module.exports = {
  greet,
  version,
};
```

## 2. **Use Your Custom Module**

In another file (e.g., `app.js`), you can use the custom module by requiring it.

```javascript
// app.js

// Require your custom module
const myModule = require('./myModule');

// Use the exported function and variable
console.log(myModule.greet('John')); // Output: Hello, John!
console.log(`Module version: ${myModule.version}`); // Output: Module version: 1.0.0
```

## 3. **Organize Your Project**

For better organization, you can create a dedicated folder for your custom modules. For example:

```
project-root/
|-- myModules/
|   |-- myModule.js
|-- app.js
```

## 4. **Run Your Application**

Run your Node.js application to see the output.

```bash
node app.js
```

## Conclusion

Creating custom modules in Node.js allows you to modularize your code, promoting reusability and maintainability. You can export functions, variables, or even classes from your module, making it easy to use them in other parts of your application.
