PM2 is a popular process manager for Node.js applications that simplifies process management and provides features like automatic restarts, clustering, and monitoring. Below is an example of using PM2 to run a clustered Node.js application:

### Example: Clustering with PM2

1. First, install PM2 globally if you haven't already:

```bash
npm install -g pm2
```

2. Create a file named `app.js` with the following content:

```javascript
// app.js
const http = require('http');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers equal to the number of CPU cores
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
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Hello from worker ${process.pid}\n`);
  });

  server.listen(3000, () => {
    console.log(`Worker ${process.pid} started`);
  });
}
```

3. Save the file and run the application using PM2:

```bash
pm2 start app.js -i max
```

The `-i max` option tells PM2 to create as many worker processes as there are CPU cores.

4. Monitor the application using PM2:

```bash
pm2 monit
```

5. Access the application by visiting `http://localhost:3000` in your web browser. PM2 will distribute incoming requests among the worker processes.

### Note:
- Adjust the code based on your specific use case and requirements.
- PM2 provides various commands for managing and monitoring your application, such as `pm2 list`, `pm2 logs`, and `pm2 stop`.

This example demonstrates a simple clustered Node.js application managed by PM2.