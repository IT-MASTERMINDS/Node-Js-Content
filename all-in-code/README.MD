Step 1: Create a Function to Store and Retrieve Data
We'll create functions to add and retrieve user data, similar to how the users array is handled.

Step 2: Modify the Routes to Use These Functions
We'll modify the routes to use the functions instead of session storage.

How It Works:
User Data Functions:

addUserData(username, data): This function adds or updates the data associated with a specific user.
getUserData(username): This function retrieves the stored data for a specific user.
In-Memory Data Store:

The userDataStore object is used to store form data keyed by the username. This allows each user to have their own data storage.
Authentication Simulation:

For simplicity, we’re simulating user authentication by setting req.user based on a successful sign-in. This is used to track which user is interacting with the system.
Handling Form Data:

In Resource 1, when the form is submitted, the data is stored using addUserData.
Resource 2 and the final page retrieve and display the stored data using getUserData.

In Node.js (and JavaScript in general), choosing between using an array ([]) or an object ({}) (dictionary) depends on how you want to store and access your data. Let's break down the differences and why you might choose one over the other.

1. Arrays ([]) in JavaScript:
Arrays are ordered collections of data.
They are typically used when you need to store a list of items that you want to access by index (e.g., users[0]).
Arrays are useful when the order of the elements matters or when you need to perform operations like mapping, filtering, or iterating over elements.
2. Objects ({}) in JavaScript:
Objects are collections of key-value pairs (similar to dictionaries in other languages).
Each key in an object is unique, and you access values by their keys (e.g., users['username']).
Objects are useful when you need to associate specific keys (e.g., usernames, IDs) with values and when the order of elements doesn't matter.
Why users is an Array:
In the initial example, users was an array because we were storing a list of user objects (each with a username and password). This structure is useful if you:

Need to add new users sequentially.
Want to iterate through all users.
Are performing operations that depend on the order of users.

const users = [
  { username: 'alice', password: 'password1' },
  { username: 'bob', password: 'password2' }
];

When to Use an Object for users:
If each user's username is unique and you want to access users directly by their username (key), using an object is more efficient. This avoids iterating through the array to find a user, making lookups faster.

Example of users as an object:

const users = {
  alice: { username: 'alice', password: 'password1' },
  bob: { username: 'bob', password: 'password2' }
};

Key Differences and Benefits:
Access by Key: With an object, you can directly access a user by their username: users['alice']. This is faster than searching through an array.
Unique Keys: Using an object ensures that each username is unique, as object keys are unique by design.
No Order: Objects do not maintain the order of elements like arrays do. If you need to iterate over the users in order, an array is better.


