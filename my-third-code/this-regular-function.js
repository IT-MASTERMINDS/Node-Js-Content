const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// Create an object to demonstrate 'this' context
const myObject = {
  value: 42,
  showValue: function () {
    console.log(`Regular Function: The value is ${this.value}`);
  },
  serverHandler: function (req, res) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(`Hello, World! The value is ${this.value}\n`);
  }
};

const server = http.createServer(function (req, res) {
  // Call the method to demonstrate 'this' in a regular function
  myObject.serverHandler(req, res);
});

server.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
  myObject.showValue();
});
