const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');  // To handle file paths
const db = require('./firebase');  // Firebase configuration

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Serve static files (HTML, CSS, JS) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 3000;

// Root route: Serve the main HTML file (index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));  // Serve the homepage HTML
});

// Additional route for fetching books from Firebase
app.get('/books', async (req, res) => {
  try {
    const books = [];
    const snapshot = await db.collection('books').get();  // Fetch books collection from Firestore
    snapshot.forEach((doc) => {
      books.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json(books);  // Return the books data as JSON
  } catch (error) {
    console.error('Error fetching books: ', error);
    res.status(500).send('Error fetching books data');
  }
});

// Serve the booklist HTML page
app.get('/booklist', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'books.html'));  // Serve the booklist HTML page
});

// Serve the contact page
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));  // Serve the contact page
});

// Serve user login page
app.get('/user-login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'user-login.html'));  // Serve the user login page
});

// Serve admin login page
app.get('/admin-login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin-login.html'));  // Serve the admin login page
});

// Serve the log form page
app.get('/log-form', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'log-form.html'));  // Serve the log form HTML page
});

// Handle user login for borrowing books
app.post('/borrow', (req, res) => {
  const { username, password } = req.body;

  // Redirect to homepage immediately after login
  res.redirect('/'); // Redirect to the homepage regardless of credentials
});

// Serve the book borrowing form
app.get('/borrow-book', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'borrow-book.html')); // Serve the book borrowing form
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
