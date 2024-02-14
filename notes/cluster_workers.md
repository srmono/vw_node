Clustering in Node.js involves creating multiple processes (workers) to handle incoming requests. This can significantly improve performance and utilize multiple CPU cores effectively. However, clustering introduces challenges such as sharing state between processes. Let's explore a simple example, identify a common problem, and provide a solution.

### Example: Clustering in Node.js

```javascript
// master.js
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers equal to the number of CPU cores
  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Handle worker events
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    // Replace the dead worker
    cluster.fork();
  });
} else {
  // Worker code
  console.log(`Worker ${process.pid} started`);

  // Simulate a time-consuming operation
  setInterval(() => {
    console.log(`Worker ${process.pid} is working`);
  }, 1000);
}
```

Save the above code in a file named `master.js` and run it using `node master.js`. This example creates multiple worker processes to simulate a clustered environment.

### Problem: Sharing State between Clustered Processes

One common challenge in clustering is sharing state between worker processes. If each worker maintains its own state, they may become out of sync, leading to inconsistencies.

### Solution: Use a Shared Store (Example with Redis)

```javascript
// master.js
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers equal to the number of CPU cores
  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Handle worker events
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    // Replace the dead worker
    cluster.fork();
  });
} else {
  // Worker code
  console.log(`Worker ${process.pid} started`);

  // Simulate a time-consuming operation
  setInterval(() => {
    // Simulate shared state using Redis
    const redis = require('redis').createClient();
    redis.incr('counter', (err, counter) => {
      if (err) throw err;
      console.log(`Worker ${process.pid} is working. Counter: ${counter}`);
    });
  }, 1000);
}
```

In this solution, Redis is used as a shared store for maintaining a counter. Each worker increments the counter in Redis, ensuring shared state among all workers.

### Note:
- Make sure to install the necessary packages (`redis` in this case) using `npm install redis` before running the examples.
- Adjust the code based on your specific use case and requirements.

This example illustrates a common problem in clustering and provides a simple solution using a shared store. Depending on your application, other solutions such as IPC (Inter-Process Communication) or messaging queues may also be applicable.