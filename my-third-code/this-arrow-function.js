const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// Create an object to demonstrate 'this' context
const myObject = {
  value: 42,

  showValue: () => {
    // In an arrow function, 'this' refers to the enclosing lexical context
    console.log(`Arrow Function: The value is ${this.value}`);
  },
  serverHandler: (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    // In an arrow function, 'this' does not refer to 'myObject' but to the surrounding context
    res.end(`Hello, World! The value is ${this.value}\n`);
  }
};

const server = http.createServer((req, res) => {
  // Call the method to demonstrate 'this' in an arrow function
  myObject.serverHandler(req, res);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  myObject.showValue();
});
