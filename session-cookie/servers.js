const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session Middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 3600000, httpOnly: true } // Session lasts for 1 hour
}));

const users = [];

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session.user) {
    return next();
  } else {
    res.redirect('/signin');
  }
}

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
    req.session.user = username; // Store username in session
    res.send(`<p>Welcome, ${username}! You are signed in. <a href="/resource1">Go to Resource 1</a></p>`);
  } else {
    res.send(`<p>Invalid credentials. <a href="/signin">Try again</a></p>`);
  }
});

// Protected Resources
app.get('/resource1', isAuthenticated, (req, res) => {
  res.send(`<p>This is Resource 1. Welcome, ${req.session.user}!</p>`);
});

app.get('/resource2', isAuthenticated, (req, res) => {
  res.send(`<p>This is Resource 2. Welcome, ${req.session.user}!</p>`);
});

app.get('/resource3', isAuthenticated, (req, res) => {
  res.send(`<p>This is Resource 3. Welcome, ${req.session.user}!</p>`);
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send('Error logging out');
    }
    res.send(`<p>You have been logged out. <a href="/signin">Sign In again</a></p>`);
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
