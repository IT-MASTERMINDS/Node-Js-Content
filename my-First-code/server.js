// Load the http module to create an HTTP server.
const http = require('http');

// Define the hostname and port the server will listen on.
const hostname = '127.0.0.1';
const port = 3000;

// Create the HTTP server and define its behavior.
const server = http.createServer((req, res) => {
  // Set the response header with HTTP status and content type.
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  // Send the response body "Hello, World!"
  res.end('Hello, World!\n');
});

// Make the server listen on the specified hostname and port.
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
