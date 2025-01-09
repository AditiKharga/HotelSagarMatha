// index.js

const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

// Initialize express app
const app = express();
const port = 3000;

// Create a MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: 'dazzle12345', // Your MySQL password
  database: 'booking_db', // Your database name
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database');
});

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files (like HTML, CSS, JS) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define route to handle form submission
app.post('/store-booking', (req, res) => {
  const { mobile, checkin, checkout, adults, children, messages } = req.body;

  // SQL query to insert data into 'bookings' table
  const query = 'INSERT INTO bookings (mobile, checkin, checkout, adults, children, messages) VALUES (?, ?, ?, ?, ?, ?)';

  // Execute the query
  db.query(query, [mobile, checkin, checkout, adults, children, messages], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ message: 'Failed to submit booking data.' });
    }
    res.status(200).json({ message: 'Booking data submitted successfully!' });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
