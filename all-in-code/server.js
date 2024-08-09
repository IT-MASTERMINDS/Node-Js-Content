const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// In-memory store for users and form data
const users = [];
const userDataStore = {};

// Functions to handle storing and retrieving user data
function addUserData(username, data) {
  userDataStore[username] = data;
}

function getUserData(username) {
  return userDataStore[username];
}

// Middleware to check if the user is authenticated
function isAuthenticated(req, res, next) {
  if (req.user) {
    return next();
  } else {
    res.redirect('/signin');
  }
}

// Middleware to simulate user authentication
function authenticate(req, res, next) {
  const { username } = req.body;
  const user = users.find(user => user.username === username);

  if (user) {
    req.user = username; // Simulate user being logged in
    next();
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

app.post('/signin', authenticate, (req, res) => {
  res.send(`<p>Welcome, ${req.user}! You are signed in. <a href="/resource1">Go to Resource 1</a></p>`);
});

// Resource 1: Form Page
app.get('/resource1', isAuthenticated, (req, res) => {
  res.send(`
    <form action="/resource1" method="POST">
      <label for="input1">Input 1:</label>
      <input type="text" id="input1" name="input1">
      <br><br>
      <label for="input2">Input 2:</label>
      <input type="text" id="input2" name="input2">
      <br><br>
      <button type="submit">Submit</button>
    </form>
    <p><a href="/resource2">Go to Resource 2</a></p>
  `);
});

// Handle form submission and store data in the in-memory store
app.post('/resource1', isAuthenticated, (req, res) => {
  const { input1, input2 } = req.body;
  addUserData(req.user, { input1, input2 }); // Store form data
  res.redirect('/resource2'); // Redirect to Resource 2
});

// Resource 2: Display Stored Data
app.get('/resource2', isAuthenticated, (req, res) => {
  const data = getUserData(req.user); // Retrieve form data
  res.send(`
    <p>Stored Data:</p>
    <ul>
      <li>Input 1: ${data.input1}</li>
      <li>Input 2: ${data.input2}</li>
    </ul>
    <p><a href="/final">Go to Final Page</a></p>
  `);
});

// Final Page: Display the same data or additional actions
app.get('/final', isAuthenticated, (req, res) => {
  const data = getUserData(req.user); // Retrieve form data
  res.send(`
    <h1>Final Page</h1>
    <p>This is the final page with the following stored data:</p>
    <ul>
      <li>Input 1: ${data.input1}</li>
      <li>Input 2: ${data.input2}</li>
    </ul>
    <p><a href="/logout">Logout</a></p>
  `);
});

// Logout route
app.get('/logout', (req, res) => {
  req.user = null; // Simulate logout
  res.send(`<p>You have been logged out. <a href="/signin">Sign In again</a></p>`);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
