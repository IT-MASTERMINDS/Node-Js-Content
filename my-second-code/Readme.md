```markdown
# My Second Node.js App

This is a simple Node.js application that sets up a basic HTTP server. 

## Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine.

## Getting Started

Follow these steps to get your server up and running:

### 1. Clone the Repository (if applicable)

If this project is in a Git repository, you can clone it using:

```sh
git clone https://github.com/your-username/my-first-nodejs-app.git
cd my-first-nodejs-app
```

### 2. Initialize the Project

If you haven't already initialized the project, run:

```sh
npm init -y
```

## Content-Type Explanation

The `Content-Type` header is used to indicate the media type of the resource. It tells the client what the content type of the returned data actually is. Here are a few common `Content-Type` values:

1. **`text/plain`**: Indicates that the content is plain text.
2. **`text/html`**: Indicates that the content is HTML. This is useful for sending web pages.
3. **`application/json`**: Indicates that the content is JSON. This is commonly used for APIs.
4. **`image/jpeg`**: Indicates that the content is a JPEG image.

### Examples of Using Different Content-Types

You can modify your server to respond with different content types based on the request. Here is how you can do it:

```js
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
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

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

### How to Test

1. **Plain Text**: Navigate to `http://127.0.0.1:3000/text` to see plain text content.
2. **HTML**: Navigate to `http://127.0.0.1:3000/html` to see HTML content.
3. **JSON**: Navigate to `http://127.0.0.1:3000/json` to see JSON content.
4. **Not Found**: Any other URL will return a 404 Not Found message.

## Project Structure

```
my-second-code-app/
├── content-type.js
└── README.md
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

This `README.md` file now includes an explanation of different `Content-Type` headers and how to use them, along with examples that you can try out.