const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const users = [];

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/signin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'signin.html'));
});

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });
  res.send(`<p>Sign Up successful. <a href="/signin">Sign In</a></p>`);
});

app.post('/signin', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(user => user.username === username && user.password === password);

  if (user) {
    res.send(`<p>Welcome, ${username}! You are signed in.</p>`);
  } else {
    res.send(`<p>Invalid credentials. <a href="/signin">Try again</a></p>`);
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
