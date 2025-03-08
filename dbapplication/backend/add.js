const sqlite3 = require('sqlite3').verbose();

// Connect to the database
let db = new sqlite3.Database('./mydatabase.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// Create a table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
)`);

// Insert a record into the table
let name = 'John Doe';
let email = 'john.doe@example.com';

db.run(`INSERT INTO users(name, email) VALUES(?, ?)`, [name, email], function(err) {
    if (err) {
        return console.error(err.message);
    }
    console.log(`A row has been inserted with rowid ${this.lastID}`);
});

// Close the database connection
db.close((err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Closed the database connection.');
});