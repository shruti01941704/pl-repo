// Import the mysql2 package
const mysql = require('mysql2');

// Create a connection to the database
const connection = mysql.createConnection({
  host: 'localhost',        // The host of the database server (e.g., localhost or IP address)
  user: 'root',             // Your MySQL username
  password: 'Mahananda@2004',             // Your MySQL password
  database: 'eshop', // Your database name
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database successfully ');
});

// Export the connection to be used in other files
module.exports = connection;
