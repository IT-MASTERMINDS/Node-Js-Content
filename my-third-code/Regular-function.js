const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer(function (req, res) {
  if (req.url === '/text') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('This is plain text.\n');
  } else if (req.url === '/html') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>This is HTML content.</h1></body></html>');
  } else if (req.url === '/json') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ message: 'This is JSON content.' }));
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found\n');
  }
});

server.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});
