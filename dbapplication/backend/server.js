const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors());

// Connect to the database
let db = new sqlite3.Database('./mydatabase.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// Create a table if it doesn't exist and add the role column if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    role TEXT
)`);

db.run(`ALTER TABLE users ADD COLUMN role TEXT`, (err) => {
    if (err && !err.message.includes('duplicate column name')) {
        console.error(err.message);
    }
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../frontend/build')));

// Serve the HTML file for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
});

// Endpoint to add a record
app.post('/add-user', (req, res) => {
    const { name, email, role } = req.body;

    db.run(`INSERT INTO users(name, email, role) VALUES(?, ?, ?)`, [name, email, role], function (err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: `A row has been inserted with rowid ${this.lastID}` });
    });
});

// Endpoint to update a record
app.put('/update-user/:id', (req, res) => {
    const { id } = req.params;
    const { name, email, role } = req.body;

    db.run(`UPDATE users SET name = ?, email = ?, role = ? WHERE id = ?`, [name, email, role, id], function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: `Row(s) updated: ${this.changes}` });
    });
});

// Endpoint to get all records
app.get('/users', (req, res) => {
    db.all(`SELECT * FROM users`, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ users: rows });
    });
});

// Endpoint to delete a record
app.delete('/delete-user/:id', (req, res) => {
    const { id } = req.params;

    db.run(`DELETE FROM users WHERE id = ?`, id, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: `Row(s) deleted: ${this.changes}` });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Close the database connection when the server is stopped
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            console.error(err.message);
        }
        console.log('Closed the database connection.');
        process.exit(0);
    });
});